// Create class constructor for orders.
class Order {
    constructor(id, items) {
        this.id = id;
        this.items = items;
        this.state = "PENDING";

        // Define within transitions the possible actions that can be called from each state.
        this.transitions = {
            CANCELLED: {
            },
            PENDING: {
                ACCEPT: () => {
                    console.log(`Order Number: ${this.id} \nStatus: ${this.state} \n\tCONFIRMING ORDER...`);
                    this.changeState("CONFIRMED");
                },
                CANCEL: () => {
                    console.log(`Order Number: ${this.id} \nStatus: ${this.state} \n\tCANCELLING ORDER...`);
                    this.changeState("CANCELLED");
                }
            },
            CONFIRMED: {
                PACKAGE: () => {
                    console.log(`Order Number: ${this.id} \nStatus: ${this.state} \n\tPACKAGING ORDER...`);
                    this.changeState("PACKED");
                },
                CANCEL: () => {
                    console.log(`Order Number: ${this.id} \nStatus: ${this.state} \n\tCANCELLING ORDER...`);
                    this.changeState("CANCELLED");
                }
            },
            PACKED: {
                SEND: () => {
                    console.log(`Order Number: ${this.id} \nStatus: ${this.state} \n\tSENDING ORDER...`);
                    this.changeState("SHIPPED");
                },
                CANCEL: () => {
                    console.log(`Order Number: ${this.id} \nStatus: ${this.state} \n\tCANCELLING ORDER...`);
                    this.changeState("CANCELLED");
                }
            },
            SHIPPED: {
                COMPLETE: () => {
                    console.log(`Order Number: ${this.id} \nStatus: ${this.state} \n\tCOMPLETING ORDER...`);
                    this.changeState("DELIVERED");
                }
            },
            DELIVERED: {
            }
        };

        // Define function dispatch which checks if the action called exists within the current transitions/state.
        // If it exists, it is called, otherwise console logs an error message.
        this.dispatch = (actionName) => {
            const possibleActions = this.transitions[this.state];
            const inputAction = this.transitions[this.state][actionName];

            if (inputAction) {
                inputAction();
            } else {
                console.error(`INVALID ACTION CALLED: ${actionName} is not a valid action for Order Number ${this.id} from state ${this.state}`);
            }
        };
        this.changeState = (nextState) => {
            this.state = nextState;
            console.log(`Order Number ${this.id} status updated to ${this.state}`);
        };
    };
}

// Instantiate demo order & log properties.
console.log(`\n###Instantiate demo order & log properties.###`)
const order_1 = new Order(1, [[1 , "drill"] , [4 , "cheese knife"] , [3 , "random orbital sander"] , [11 , "RTX 3080"]]);
console.log(order_1);
console.log(order_1.id);
console.log(order_1.items);
console.log(order_1.state);

// Test inappropriate actions at PENDING then progress to CONFIRMED.
console.log(`\n###Test inappropriate actions at PENDING then progress to CONFIRMED.###`)
order_1.dispatch("PACKAGE");
order_1.dispatch("SEND");
order_1.dispatch("COMPLETE");
order_1.dispatch("ACCEPT");

// Test inappropriate actions at CONFIRMED then progress to PACKED.
console.log(`\n###Test inappropriate actions at CONFIRMED then progress to PACKED.###`)
order_1.dispatch("ACCEPT");
order_1.dispatch("SEND");
order_1.dispatch("COMPLETE");
order_1.dispatch("PACKAGE");

// Test inappropriate actions at PACKED then progress to SHIPPED.
console.log(`\n###Test inappropriate actions at PACKED then progress to SHIPPED.###`)
order_1.dispatch("ACCEPT");
order_1.dispatch("PACKAGE");
order_1.dispatch("COMPLETE");
order_1.dispatch("SEND");

// Test inappropriate actions at SHIPPED then progress to DELIVERED.
console.log(`\n###Test inappropriate actions at SHIPPED then progress to DELIVERED.###`)
order_1.dispatch("ACCEPT");
order_1.dispatch("PACKAGE");
order_1.dispatch("SEND");
order_1.dispatch("COMPLETE");

// Instatiate demo showing full progression through states.
console.log(`\n###Instantiate demo showing full progression through states.###`)
const order_2 = new Order(2, [[1 , "drill"] , [4 , "cheese knife"] , [3 , "random orbital sander"] , [11 , "RTX 3080"]]);
order_2.dispatch("ACCEPT");
order_2.dispatch("PACKAGE");
order_2.dispatch("SEND");
order_2.dispatch("COMPLETE");

// Instatiate demo order to demonstrate cancellation at PENDING.
console.log(`\n###Instatiate demo order to demonstrate cancellation at PENDING.###`)
const order_3 = new Order(3, [[1 , "drill"] , [4 , "cheese knife"] , [3 , "random orbital sander"] , [11 , "RTX 3080"]]);
order_3.dispatch("CANCEL");

// Instatiate demo order to demonstrate cancellation at CONFIRMED.
console.log(`\n###Instatiate demo order to demonstrate cancellation at CONFIRMED.###`)
const order_4 = new Order(4, [[1 , "drill"] , [4 , "cheese knife"] , [3 , "random orbital sander"] , [11 , "RTX 3080"]]);
order_4.dispatch("ACCEPT");
order_4.dispatch("CANCEL");

// Instatiate demo order to demonstrate cancellation at PACKED.
console.log(`\n###Instatiate demo order to demonstrate cancellation at PACKED.###`)
const order_5 = new Order(5, [[1 , "drill"] , [4 , "cheese knife"] , [3 , "random orbital sander"] , [11 , "RTX 3080"]]);
order_5.dispatch("ACCEPT");
order_5.dispatch("PACKAGE");
order_5.dispatch("CANCEL");

// Demonstrate actions cannot be called on cancelled order.
console.log(`\n###Demonstrate actions cannot be called on cancelled order.###`)
order_5.dispatch("CANCEL");
order_5.dispatch("ACCEPT");
order_5.dispatch("PACKAGE");
order_5.dispatch("SEND");
order_5.dispatch("COMPLETE");


// BACKWARD ACTIONS     STATES          FORWARD ACTIONS
//                      CANCELLED
// <--cancel--          PENDING         --accept-->
// <--cancel--          CONFIRMED       --package-->        
// <--cancel--          PACKED          --send-->
//                      SHIPPED         --complete-->
//                      DELIVERED 