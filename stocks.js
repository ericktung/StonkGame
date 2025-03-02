class Introduction extends Engine.Scene {
    setup() {
        this.engine.setTitle("stock 4.0");
        this.engine.addAction("begin");
        this.engine.show("Get ready to trade!");
    }

    handleAction() {
        this.engine.gotoScene(Trading);
    }
}

class Trading extends Engine.Scene {
    setup() {
        this.stock = 0;
        this.cash = 1000;
        this.price = 0;

        this.engine.setTitle("Trade stock");

        this.engine.addAction("buy");
        this.engine.addAction("sell");
    }


    update(time) {
        if (Math.random() < 0.05) {
            this.price = 100 + 20 * Math.sin(time / 1000.0);
        }

        this.engine.show(JSON.stringify({
            stock: this.stock + " stock",
            cash: "$" + this.cash.toFixed(2),
            price: "$" + this.price.toFixed(2)
        }, null, 1));
    }

    handleAction(action) {
        if (action == "buy" && this.cash > this.price) {
            this.stock += 1;
            this.cash -= this.price;
        }

        if (action == "sell" && this.stock > 0) {
            this.stock -= 1;
            this.cash += this.price;
        }

        if (this.cash > 2000) {
            this.engine.gotoScene(Victory);
        }
    }
}

class Victory extends Engine.Scene {
    setup() {
        this.engine.setTitle("Victory");
        this.engine.addAction("replay");
        this.engine.show("Nice! Play again?");
    }

    handleAction() {
        this.engine.gotoScene(Trading);
    }
}

let game = new Engine.Game(Introduction, 'gameContainer');