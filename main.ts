
namespace tests {
    
    export class Assertion {
        name: string;
        condition: (value: any, other?: any) => boolean;

        constructor(name: string, condition: (value: any, other?: any) => boolean) {
            this.name = name;
            this.condition = condition;
        }

        execute(value: any, other?: any) {
            let result = this.condition(value, other);
            if (!result) this.fail([value, other]);
        }

        private fail(values: any[]): void {
            let formatted = values.map((value) => JSON.stringify(value)).join(", ");
            throw `Assertion ${this.name} failed with values ${formatted}`;
        }
    }

    export class AssertEqual extends Assertion {
        constructor(value: any, other: any) {
            super("AssertEqual", (value, other) => value === other);
            this.execute(value, other);
        }
    }

    export class AssertNotEqual extends Assertion {
        constructor(value: any, other: any) {
            super("AssertNotEqual", (value, other) => value !== other);
            this.execute(value, other);
        }
    }

    export class AssertTrue extends Assertion {
        constructor(value: any) {
            super("AssertTrue", (value) => !!value);
            this.execute(value);
        }
    }

    export class AssertFalse extends Assertion {
        constructor(value: any) {
            super("AssertFalse", (value) => !value);
            this.execute(value);
        }
    }

    export class AssertIsNull extends Assertion {
        constructor(value: any) {
            super("AssertIsNull", (value) => value === null);
            this.execute(value);
        }
    }

    export class AssertIsNotNull extends Assertion {
        constructor(value: any) {
            super("AssertIsNotNull", (value) => value !== null);
            this.execute(value);
        }
    }
    
    export class AssertIsUndefined extends Assertion {
        constructor(value: any) {
            super("AssertIsUndefined", (value) => value === undefined);
            this.execute(value);
        }
    }
    
    export class AssertIsNotUndefined extends Assertion {
        constructor(value: any) {
            super("AssertIsNotUndefined", (value) => value !== undefined);
            this.execute(value);
        }
    }
    
    export class AssertIsNullOrUndefined extends Assertion {
        constructor(value: any) {
            super("AssertIsNullOrUndefined", (value) => value === undefined || value === null);
            this.execute(value);
        }
    }
    
    export class AssertIsNotNullOrUndefined extends Assertion {
        constructor(value: any) {
            super("AssertIsNotNullOrUndefined", (value) => value !== undefined && value !== null);
            this.execute(value);
        }
    }
    
    export class AssertIn extends Assertion {
        constructor(value: any, array: any[]) {
            super("AssertIn", (value, array) => array.contains(value));
            this.execute(value, array);
        }
    }

    export class AssertNotIn extends Assertion {
        constructor(value: any, array: any[]) {
            super("AssertNotIn", (value, array) => !array.contains(value));
            this.execute(value, array);
        }
    }
    
    export class AssertRaises extends Assertion {
        constructor(value: () => any) {
            super("AssertRaises", function(value) {
                try {value();}
                catch(e) {return true;}
                return false;
            });
            this.execute(value);
        }
    }

    export class AssertGreater extends Assertion {
        constructor(value: number, other: number) {
            super("AssertGreater", (value, other) => value > other);
        }
    }
    
    export class AssertGreaterEqual extends Assertion {
        constructor(value: number, other: number) {
            super("AssertGreaterEqual", (value, other) => value >= other);
        }
    }
    
    export class AssertLess extends Assertion {
        constructor(value: number, other: number) {
            super("AssertLess", (value, other) => value < other);
        }
    }

    export class AssertLessEqual extends Assertion {
        constructor(value: number, other: number) {
            super("AssertLessEqual", (value, other) => value <= other);
        }
    }
    
    export class AssertItemsEqual extends Assertion {
        constructor(value: any[], other: any[]) {
            super("AssertItemsEqual", (value, other) => value.sort() === other.sort());
        }
    }
}