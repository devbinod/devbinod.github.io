// CSE 190 M
// script to help with grading HW7 Fifteen Puzzle
// author: Marty Stepp

(function() {
	var BASE_URL = "https://www.cs.washington.edu/education/courses/cse190m/12sp/homework/7/";
	var WEBSTER_BASE_URL = "https://webster.cs.washington.edu/cse190m/homework/hw7/";
	
	if (location.href.match(/taResources/)) {
		// so the sample solution will run in the taResources web folder
		WEBSTER_BASE_URL = "https://www.cs.washington.edu/education/courses/cse190m/12sp/proxy.php?url=" + WEBSTER_BASE_URL;
	}
	
	var loadScript = function(url, immediately) {
		if (immediately) {
			document.write("<script src=\"" + url + "\" type=\"text/javascript\"></script>\n");
		} else {
			var scriptTag = document.createElement("script");
			scriptTag.type="text/javascript";
			scriptTag.src = url;
			document.body.appendChild(scriptTag);
		}
	};
	
	if (location.search.match(/__grading=(true|on|1|yes)/)) {
		// in case they don't link to Prototype
		if (typeof(Prototype) === "undefined") {
			loadScript("https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js", true);
		}

		// dynamically load the JStep library
		if (typeof(JStep) === "undefined") {
			loadScript("http://www.webstepbook.com/jstep.js", true);
		}
	}
	
	var MAX_ALLOWED_SHUFFLE_TIME = 1000;   // ms
	var MIN_TILES_REARRANGED = 10;         // at least this many tiles must change position during shuffle
	var timer = null;
	var pieces = null;
	var startTime = 0;
	
	var removeBG = function() {
		document.body.style.backgroundColor = document.body.oldBackgroundColor;
		document.body.removeClassName("fail");
		$("__gradingmessages").innerHTML = "";
	};
	
	var ajaxError = function(ajax, exception) {
		alert("Ajax error " + ajax.status + ": " + ajax.statusText);
		if (exception) {
			throw exception;
		}
	};
	
	
	var filterOutGradingElements = function(a) {
		var a2 = [];
		for (var i = 0; i < a.length; i++) {
			var up = a[i].up("#__gradingarea");
			if (!up && a[i] != $("__gradingarea")) {
				a2.push(a[i]);
			}
		}
		return a2;
	};
	
	var $$f = function(str) {
		var elements = $(str);
		return filterOutGradingElements(elements);
	};
	
	var checkFonts = function(event) {
		event.stop();
		removeBG();

		JStep.Test.assertStyle(document.body, "font-family", "cursive");
		JStep.Test.assertStyle(document.body, "font-size", "19px");
		
		var puzzlePieces = $$f(".puzzlepiece, div div");
		JStep.Test.assert(puzzlePieces.length >= 15, "page should have at least 15 puzzle pieces");
		JStep.Test.assertStyle(puzzlePieces, "font-family", "cursive", "puzzle pieces");
		JStep.Test.assertStyle(puzzlePieces, "font-size", "53px", "puzzle pieces");
		JStep.Test.assertStyle(puzzlePieces, "width", "90px", true);
		JStep.Test.assertStyle(puzzlePieces, "height", "90px", true);
		// just check the left borders so that it will work in Firefox  (without -left it returns "" for some reason, bleh)
		JStep.Test.assertStyle(puzzlePieces, "border-left-width", "5px", true);
		JStep.Test.assertStyle(puzzlePieces, "border-left-style", {"solid": true, "groove": true}, true);
		JStep.Test.assertStyle(puzzlePieces, "border-left-color", "rgb(0, 0, 0)", true);
		
		var headings = $$f("h1,h2,h3,h4,h5,h6");
		JStep.Test.assertStyle(headings, "font-family", "cursive");
		JStep.Test.assertStyle(headings, "font-size", "37px", "h1-h6");
		
		var linkImages = $$f("a img");
		JStep.Test.assert(linkImages.length >= 3, "page should have three images in bottom-right that link to validators");
		JStep.Test.assertAttribute($$f("a"), "href", [
			"https://webster.cs.washington.edu/validate-html.php",
			"https://webster.cs.washington.edu/validate-css.php",
			"https://webster.cs.washington.edu/jslint/?referer"], true);
		
		if (JStep.Test.showResults()) {
			$("__gradingmessages").innerHTML = "Fonts test passed";
		} else {
			$("__gradingmessages").innerHTML = "Fonts test failed!";
		}
	};
	
	
	var windowLoad = function() {
		// only continue if the "grading" query param or cookie is set to a truthy value
		var gradingTruthy = (typeof($_REQUEST) !== "undefined" &&
				($_REQUEST["__grading"] === "1" || $_REQUEST["__grading"] === "on" || $_REQUEST["__grading"] === "true"));
		if (!gradingTruthy && !JStep.Cookie.get("__grading")) {
			return;
		}
		
		new Ajax.Request(WEBSTER_BASE_URL + "grading.html", {
			method: "get",
			onSuccess: function(ajax) {
				var div = document.createElement("div");
				div.innerHTML = ajax.responseText;
				document.body.appendChild(div);
				
				$("__checkfonts").observe("click", checkFonts);
				$("__checkboard").observe("click", checkBoard);
			},
			onFailure: ajaxError
		});

		/*
		var div = $(document.createElement("div"));
		div.id = "gradingarea";
		
		var button = $(document.createElement("button"));
		button.innerHTML = "Check Board";
		button.style.color = "#cc0000";
		button.style.fontSize = "larger";
		button.style.fontWeight = "bold";
		button.observe("click", checkBoard);
		div.appendChild(button);
		document.body.appendChild(div);
		*/
		
		// registering for mouseup because they might set .onclick and clobber my handler if I set a .onclick
		$("shufflebutton").observe("mouseup", function() {
			removeBG();
			if (!pieces) {
				pieces = $$f(".puzzlepiece, div div");
			}
			
			if (timer) {
				clearInterval(timer);
			}
			/*
			var span = $("elapsedspan");
			if (!span) {
				var span = $(document.createElement("div"));
				span.id = "elapsedspan";
				$("controls").appendChild(span);
			}
			*/
			$("__gradingmessages").innerHTML = "...<br />...";

			// tag all divs so I know if they have been shuffled
			for (var i = 0; i < pieces.length; i++) {
				pieces[i].__shuffleleft = undefined;
				pieces[i].__shuffletop = undefined;
				pieces[i].__left = JStep.DOM.getStyle(pieces[i], "left");
				pieces[i].__top  = JStep.DOM.getStyle(pieces[i], "top");
			}
			
			// comes before 'click' event
			startTime = new Date().getTime();
			
			// check to see whether board is done shuffling
			timer = setInterval(checkDoneShuffling, 50);
		});
	};
	
	function checkDoneShuffling() {
		var doneMoving = 0;
		for (var i = 0; i < pieces.length; i++) {
			if (pieces[i].__shuffleleft && pieces[i].__shuffletop) {
				if (pieces[i].__shuffleleft == JStep.DOM.getStyle(pieces[i], "left") &&
						pieces[i].__shuffletop == JStep.DOM.getStyle(pieces[i], "top")) {
					// has moved previously, and still there; unchanging
					doneMoving++;
				}
			} else if (pieces[i].__left != JStep.DOM.getStyle(pieces[i], "left") ||
					pieces[i].__top  != JStep.DOM.getStyle(pieces[i], "top")) {
				// piece has moved from where it started; remember this
				pieces[i].__shuffleleft = JStep.DOM.getStyle(pieces[i], "left");
				pieces[i].__shuffletop = JStep.DOM.getStyle(pieces[i], "top");
			}
		}
		
		var endTime = new Date().getTime();
		var elapsed = (endTime - startTime);
		if (Math.floor(elapsed / 100) % 2 == 0) {
			$("__gradingmessages").innerHTML += ".";
		}

		if (doneMoving >= MIN_TILES_REARRANGED || elapsed >= 2 * MAX_ALLOWED_SHUFFLE_TIME) {
			clearInterval(timer);
			if (doneMoving < MIN_TILES_REARRANGED) {
				// span.className = "invalid";
				// document.body.className = "invalid";
				// span.innerHTML = doneMoving + " tile(s) moved<br/>ERROR: Did not rearrange board enough.";
				JStep.Test.fail(doneMoving + " tile(s) moved; ERROR: Shuffle algorithm might not rearrange board enough.",
						undefined,
						true);
			} else if (elapsed > MAX_ALLOWED_SHUFFLE_TIME) {
				// span.className = "invalid";
				// document.body.className = "invalid";
				if (elapsed >= 2 * MAX_ALLOWED_SHUFFLE_TIME) {
					JStep.Test.fail(elapsed + "ms; ERROR: Timeout because shuffle took too long.",
							undefined,
							true);
				}
			} else {
				// good shuffle!
				// document.body.className = "valid";
				// span.innerHTML = elapsed + "ms, " + doneMoving + " tile(s) moved: OK";
				var message = elapsed + "ms, " + doneMoving + " tile(s) moved: OK";
				JStep.Test.pass(message);
				$("__gradingmessages").innerHTML = message;
			}
			
			checkBoard(true);
			JStep.Test.showResults();
		}
	}
	
	/*
	Returns true if the current fifteen puzzle board can be solved,
	and false if it cannot.

	From Wolfram Mathworld, http://mathworld.wolfram.com/15Puzzle.html:

	"To address the solubility of a given initial arrangement, proceed as follows.
	If the square containing the number i appears "before" (reading the squares in
	the box from left to right and top to bottom) n numbers that are less than i,
	then call it an inversion of order n, and denote it n_i. Then define 'N'
	to be the sum of all n_i from n = 2 to n = 15 inclusive.
	Also define e to be the row number of the empty square.
	Then if N+e is even, the position is possible, otherwise it is not."

	In other words, n_i is the number of squares with values < i that appear 'after'
	(down/right of) the square with the value i.
	N, the sum of all n_i, plus the row number of the empty square, must be even.
	*/
	function checkBoard(silent) {
		var totalInversions = 0;
		var textToAlert = "";
		
		var pieces = $$f(".puzzlepiece, div div");
		if (pieces.length < 15) {
			textToAlert += "Found only " + pieces.length + " pieces (expected 15); result may be unreliable.\n";
		}
		
		// rowCount[i] stores a count of the number of squares at row i;
		// once the outer for loop is done, we look for an odd rowCount[i] to figure
		// out what row has the empty square in it.
		var rowCount = [];
		var numRows = Math.ceil(Math.sqrt(pieces.length));
		for (var i = 0; i < numRows; i++) {
			rowCount.push(0);
		}
		
		textToAlert += "inversions:\n  ";
		for (var i = 0; i < pieces.length; i++) {
			var num1 = parseInt(pieces[i].innerHTML);
			if (isNaN(num1)) { continue; }
			var row1 = parseInt(pieces[i].style.top) / 100;
			var col1 = parseInt(pieces[i].style.left) / 100;

			rowCount[row1]++;
			if (num1 <= 1) {
				textToAlert += num1 + "=0 ";
				continue;
			}  // cannot have any inversions
			
			// figure out the inversion order for this piece
			var inversions = 0;
			for (var j = 0; j < pieces.length; j++) {
				var num2 = parseInt(pieces[j].innerHTML);
				var row2 = parseInt(pieces[j].style.top) / 100;
				var col2 = parseInt(pieces[j].style.left) / 100;
				
				// look at squares that come 'after' pieces[i] with value < num1
				if (row2 > row1 || (row2 == row1 && col2 > col1)) {
					if (num2 < num1) {
						inversions++;
					}
				}
			}
			
			totalInversions += inversions;
			textToAlert += num1 + "=" + inversions + " ";
			if (num1 % 4 == 0) {
				textToAlert += "\n  ";
			}
		}
		textToAlert += "\n  total inversions = " + totalInversions + "\n\n";
		
		var e = 0;
		for (var i = 0; i < rowCount.length; i++) {
			if (rowCount[i] % 2 != 0) {
				e = (i + 1);   // 1-based row number
				break;
			}
		}
		textToAlert += "e (1-based row number for empty square) = " + e + "\n\n";
		
		var valid = (totalInversions + e) % 2 == 0;
		
		textToAlert += "sum of (total inversions + e) = " + (totalInversions + e) + "\n\n";
		textToAlert += "valid (sum must be even)? " + ("" + valid).toUpperCase();
		
		// background color indicates whether board is valid or not
		//if (!valid) {
		//	document.body.className = "invalid";
		//}
		
		// alert a message saying whether board is valid
		if (typeof(silent) !== "boolean" || !silent) {
			alert(textToAlert);
		} else {
			if (valid) {
				JStep.Test.pass("board state is solvable");
				$("__gradingmessages").innerHTML += ", board state is solvable.";
			} else {
				JStep.Test.fail("board is unsolvable");
				$("__gradingmessages").innerHTML += ", ERROR: board is unsolvable";
			}
		}
	}

	var inputs = $$f("input");
	if (inputs.length > 0) {
		windowLoad();
	} else {
		// not loaded yet
		if (typeof(document.observe) === "function") {
			document.observe("dom:loaded", windowLoad);
		} else if (window.addEventListener) {
			window.addEventListener("load", windowLoad, false);
		} else {
			window.attachEvent("onload", windowLoad);
		}
	}
})();