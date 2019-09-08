var screen = document.getElementById("screen");
function random(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min)
} 

var monster = {
    health:100,
    location:[random(0, 8), random(0, 8)],
    attack:[random(1, 11),random(11, 21)]
}

var currMon = new Object(monster)

var Person = {
    health:100,
    maxHealth:100,
    location:[0,0],
    attack:[random(5, 16),random(16, 26)],
    heal:[1, random(2, 51)]
}

function setup() {
    if (Person["location"][0] === monster["location"][0] && Person["location"][1] === monster["location"][1]) {
        currMon["location"][0] = random(0,9)
        currMon["location"][1] = random(0,9)
    }

    document.getElementById("(" + currMon["location"][0] + "," + currMon["location"][1] + ")").value = "M"
    document.getElementById("(" + Person["location"][0] + "," + Person["location"][1] + ")").value = "U"
    
}

function onPress(target) {
    if (target.value == "clear") {
        screen.value = "";
    } else if (target.value == "enter") {
        enterPressed();
    } else {
        screen.value = screen.value + target.value;
   }
}

function enterPressed() {
    switch(screen.value) {
        case "Player.attack(up)":
            screen.value = "Command Sended!"
            attack("up")
            break;
        case "Player.attack(down)":
            screen.value = "Command Sended!"
            attack("down")
            break;
        case "Player.attack(left)":
            screen.value = "Command Sended!"
            attack("left")
            break;
        case "Player.attack(right)":
            screen.value = "Command Sended!"
            attack("right")
            break;
        case "Player.move(up)":
            screen.value = "Command Sended!"
            move("up")
            break;
        case "Player.move(down)":
            screen.value = "Command Sended!"
            move("down")
            break;
        case "Player.move(left)":
            screen.value = "Command Sended!"
            move("left")
            break;
        case "Player.move(right)":
            screen.value = "Command Sended!"
            move("right")
            break;
        case "Player.health()":
            screen.value = "Command Sended!"
            heal()
            break;
        case "Player.check.attack()":
            screen.value = "Command Sended!"
            checkAttack()
            break;
        case "Player.check.health()":
            screen.value = "Command Sended!"
            checkHealth()
            break;
        default:
            screen.value = "Error: Not a Command!"
    }

    function relLoc(curLoc, dir) {
        x = Person["location"][0]
        y = Person["location"][1]

        switch(dir){
            case "up":
                y -= 1
                break
            case "down":
                y += 1
                break
            case "left":
                x -= 1
                break
            case "right":
                x += 1
                break
        }

        return [x,y]
    }

    function attack(dir) {
        if (relLoc(Person["location"], dir)[0] === monster["location"][0] && relLoc(Person["location"], dir)[1] === monster["location"][1]) {
            playerAtt = random(Person["attack"][0], Person["attack"][1])

            currMon["health"] -= playerAtt

            if (currMon["health"] <= 0) {
                screen.value = "You killecd the monster!"

                document.getElementById("(" + currMon["location"][0] + "," + currMon["location"][1] + ")").value = ""
                currMon = new Object(monster)

                currMon["location"][0] = random(0,9)
                currMon["location"][0] = random(0,9)

                setup()
                return
            }

            monsterAtt = random(currMon["attack"][0], currMon["attack"][1])

            Person["health"] -= monsterAtt
            if (Person["health"] <= 0) {
                window.close();
            }

            screen.value = "You losted " + monsterAtt + " points of health while dealing " + playerAtt + " points of damage!"
        } else {
            screen.value = "There is nothing to attack at " + relLoc(Person["location"], dir) + "!"
        }
    }

    

    function move(dir) {
        if (relLoc(Person["location"], dir)[0] === monster["location"][0] && relLoc(Person["location"], dir)[1] === monster["location"][1]) {
            screen.value = "There is a monster there!"
        } else {
            updateLoc(relLoc(Person["location"], dir)[0],relLoc(Person["location"], dir)[1])
        }
    }

    function updateLoc(x, y) {
        if (x < 0 || x > 7 || y < 0 || y > 7) {
            screen.value = "Error: Not a vaild move!"
            return
        }

        document.getElementById("(" + Person["location"][0] + "," + Person["location"][1] + ")").value = ""
        document.getElementById("(" + x + "," + y + ")").value = "U"
        Person["location"][0] = x
        Person["location"][1] = y
    }

    function heal() {
        addH = random(Person["heal"][0],Person["heal"][1])
        Person["health"] += addH

        screen.value = "You healed " + addH + " points of health!"

        if (Person["health"] > 100) {
            Person["health"] === 100
        }
    }

    function checkAttack() {
        screen.value = "Your Attack is " + "(" + Person["attack"][0] + "," +Person["attack"][1] + ")!"
    }

    function checkHealth() {
        screen.value = "Your Health is " + Person["health"] + "/" + Person["maxHealth"] + "!"
    }
}

setup()