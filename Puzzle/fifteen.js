$(document).ready(function () {
    let started = false;
    let closeElements = [];
    let blankPosition;
 
    let defaultPositions = [
        { left: 0, top: 0 },
        { left: 100, top: 0 },
        { left: 200, top: 0 },
        { left: 300, top: 0 },
        { left: 0, top: 100 },
        { left: 100, top: 100 },
        { left: 200, top: 100 },
        { left: 300, top: 100 },
        { left: 0, top: 200 },
        { left: 100, top: 200 },
        { left: 200, top: 200 },
        { left: 300, top: 200 },
        { left: 0, top: 300 },
        { left: 100, top: 300 },
        { left: 200, top: 300 },
        { left: 300, top: 300 }
    ]

    Object.prototype.clone = function () {
        let newObj = (this instanceof Array) ? [] : {};
        for (i in this) {
            if (i == 'clone') continue;
            if (this[i] && typeof this[i] == "object") {
                newObj[i] = this[i].clone();
            } else newObj[i] = this[i]
        } return newObj;
    };

    (function init() {
        let puzzleArea = document.getElementById('puzzlearea');
        let divs = puzzleArea.getElementsByTagName("div");

        setPuzzleBackground(divs, false);
    })();

    function setPuzzleBackground(divs, shuffle) {

        // initialize each piece
        for (let i = 0; i < divs.length; i++) {
            let div = divs[i];

            // calculate x and y for this piece
            let x = ((i % 4) * 100);
            let y = (Math.floor(i / 4) * 100);

            // set basic style and background
            div.className = "puzzlepiece";
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            if (!shuffle) {
                div.style.backgroundImage = 'url("http://mumstudents.org/cs472/2019-10-BL/Homework/9puzzle/resources/background.jpg")';
                div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
            }

            // store x and y for later
            div.x = x;
            div.y = y;
        }
    }

    let shuffle = function (puzzleArea) {
        for (let i = puzzleArea.children.length; i >= 0; i--) {
            puzzleArea.append(puzzleArea.children[Math.random() * i | 0]);

        }
    }

    $("#shufflebutton").click(function () {
        started = true; 
        findElementsClose();
        shufflePuzzle();
    });

    function findBlankPosition() {
        let auxArr = defaultPositions.clone();
        $('.puzzlepiece').each(function (i, v) {
            let position = getPositionByElem($(this));
            auxArr = removeElementFromArray(auxArr, position);
        });

        return auxArr[0];
    }

    function removeElementFromArray(arr, position) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].left == position.left && arr[i].top == position.top)
                arr.splice(i, 1);
        }
        return arr;
    }

    function findElementsClose() {
        blankPosition = findBlankPosition();

        closeElements = [];

        let arrReferences =
            [
                { left: blankPosition.left - 100, top: blankPosition.top },
                { left: blankPosition.left + 100, top: blankPosition.top },
                { left: blankPosition.left, top: blankPosition.top - 100 },
                { left: blankPosition.left, top: blankPosition.top + 100 }
            ]

        arrReferences.forEach(function (v, i) {
            if (v.left >= 0 && v.left <= 300 && v.top >= 0 && v.top <= 300)
                closeElements.push(v);
        });

        addHtmlElementToCloseElements();
    }

    function addHtmlElementToCloseElements() {
        let puzzleArea = document.getElementById('puzzlearea');
        let divs = puzzleArea.getElementsByTagName("div");

        $(divs).each(function (i, e) {
            let elem = $(this);
            let position = getPositionByElem(elem);

            closeElements.forEach(function (v, i) {
                if (v.top == position.top && v.left == position.left)
                    v.element = elem;
            });
        }); 
    }

    $(".puzzlepiece").click(function () {
        if (started) {
            position = getPositionByElem($(this));
            let element = searchIfElementExists(closeElements, position)
            if (element != null) 
                setBlankPosition(element);
        }
    });

    function shufflePuzzle() {        
        for (let i = 0; i < 100; i++) {
            var closeElem = closeElements[Math.floor(Math.random() * closeElements.length)];
            setBlankPosition(closeElem.element);
        }        
    }

    function setBlankPosition(element)
    {
        let style = element.attr("style");
        let arrStyle = style.split(";");
        arrStyle.splice(0, 1, "left: " + blankPosition.left + "px");
        arrStyle.splice(1, 1, "top:" + blankPosition.top + "px");
        element.attr("style", arrStyle.join(";"));
        findElementsClose();
    }

    function getPositionByElem(elem) {
        let arr = elem.attr("style").split(';');
        let leftPosition = parseInt(arr[0].split(':')[1]);
        let topPosition = parseInt(arr[1].split(':')[1]);
        let position = { left: leftPosition, top: topPosition };
        return position;
    }

    function searchIfElementExists(arr, position) {

        var element = null;
        arr.forEach((v, i) => {
            if (v.left == position.left && v.top == position.top)
                element = v.element;
        });

        return element;
    }

    $(".puzzlepiece").hover(
        function () {
            if (started) {
                position = getPositionByElem($(this));
                let element = searchIfElementExists(closeElements, position);
                if (element != null) 
                    $(element).addClass('movablepiece');
            }
        },
        function () {
            if (started) {
                $(this).removeClass('movablepiece');
            }
        });
});