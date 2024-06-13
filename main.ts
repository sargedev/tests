
namespace tests {

    export let LOGGING = true;

    function includes(item: any, array: any[]): boolean {
        let found = false;
        array.forEach((value) => {
            if (checkEquality.equal(value, item)) found = true;
        })
        return found;
    }

    function itemsEqual(value: any[], other: any[]): boolean {
        if (value.length !== other.length) return false;

        let found: boolean;
        for (let i = 0; i < value.length; i++) {
            found = false;
            for (let j = 0; j < other.length; j++) {
                if (checkEquality.equal(value[i], other[j])) {
                    other.removeAt(j);
                    found = true;
                    break;
                }
            }
            if (!found) return false;
        }
        return true;
    }
    
    class Assertion {
        name: string;
        condition: (value: any, other?: any) => boolean;

        constructor(name: string, condition: (value: any, other?: any) => boolean) {
            this.name = name;
            this.condition = condition;
        }

        execute(value?: any, other?: any) {
            let result = this.condition(value, other);
            if (result) this.success([value, other]);
            else this.fail([value, other]);
        }

        private format(values: any[]): string {
            let formatted = values.map((value) => text.stringify(value));
            return formatted.join(", ");
        }

        private fail(values: any[]): void {
            let formatted = this.format(values);
            throw `Assertion ${this.name} failed with values ${formatted}`;
        }
        
        private success(values: any[]): void {
            if (LOGGING) {
                let formatted = this.format(values);
                console.log(`Assertion ${this.name} succeeded with values ${formatted}`);
            }
        }
    }

    export class Assert extends Assertion {
        constructor(condition: () => boolean) {
            super("Assert", () => condition());
            this.execute();
        }
    }

    export class AssertEqual extends Assertion {
        constructor(value: any, other: any) {
            super("AssertEqual", (value, other) => checkEquality.equal(value, other));
            this.execute(value, other);
        }
    }

    export class AssertNotEqual extends Assertion {
        constructor(value: any, other: any) {
            super("AssertNotEqual", (value, other) => !checkEquality.equal(value, other));
            this.execute(value, other);
        }
    }

    export class AssertTrue extends Assertion {
        constructor(value: any) {
            super("AssertTrue", (value) => !!true);
            this.execute(value);
        }
    }

    export class AssertFalse extends Assertion {
        constructor(value: any) {
            super("AssertFalse", (value) => !false);
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
            super("AssertIn", (value, array) => includes(value, array));
            this.execute(value, array);
        }
    }

    export class AssertNotIn extends Assertion {
        constructor(value: any, array: any[]) {
            super("AssertNotIn", (value, array) => !includes(value, array));
            this.execute(value, array);
        }
    }
    
    export class AssertRaises extends Assertion {
        constructor(method: () => any, exception?: string) {
            super("AssertRaises", function(value) {
                try {value();}
                catch(e) {return exception ? e === exception : true;}
                return false;
            });
            this.execute(method, exception);
        }
    }

    export class AssertGreater extends Assertion {
        constructor(value: number, other: number) {
            super("AssertGreater", (value, other) => value > other);
            this.execute(value, other);
        }
    }
    
    export class AssertGreaterEqual extends Assertion {
        constructor(value: number, other: number) {
            super("AssertGreaterEqual", (value, other) => value >= other);
            this.execute(value, other);
        }
    }
    
    export class AssertLess extends Assertion {
        constructor(value: number, other: number) {
            super("AssertLess", (value, other) => value < other);
            this.execute(value, other);
        }
    }

    export class AssertLessEqual extends Assertion {
        constructor(value: number, other: number) {
            super("AssertLessEqual", (value, other) => value <= other);
            this.execute(value, other);
        }
    }
    
    export class AssertItemsEqual extends Assertion {
        constructor(value: any[], other: any[]) {
            super("AssertItemsEqual", (value, other) => itemsEqual(value, other));
            this.execute(value, other);
        }
    }

    // Block functions

    export function assertEqual(value: any, other: any): void {
        new tests.AssertEqual(value, other);
    }

    export function assertNotEqual(value: any, other: any): void {
        new tests.AssertNotEqual(value, other);
    }

    export function assertTrue(value: any): void {
        new tests.AssertTrue(value);
    }
    
    export function assertFalse(value: any): void {
        new tests.AssertFalse(value);
    }

    export function assertIsNull(value: any): void {
        new tests.AssertIsNull(value);
    }

    export function assertIsNotNull(value: any): void {
        new tests.AssertIsNotNull(value);
    }
}