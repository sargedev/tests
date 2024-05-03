
namespace tests {

    export let LOGGING = true;

    function includes(item: any, array: any[]): boolean {
        let found = false;
        array.forEach((value) => {
            if (value === item) found = true;
        })
        return found;
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
            let formatted = values.map((value) => typeof value === "function" ? "<method>" : value);
            formatted = formatted.map((value) => value === "<method>" ? value : JSON.stringify(value));
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
            super("AssertEqual", (value, other) => this.checkEquality(value, other));
            this.execute(value, other);
        }
        
        private checkEquality(value: any, other: any): boolean {
            if (Array.isArray(value) && Array.isArray(other)) {
                if ((value as any[]).length !== (other as any[]).length) return false;
                
                for (let i = 0; i < (value as any[]).length; i++){
                    if ((value as any[])[i] !== (other as any[])[i]) return false;
                }
                return true;
            }

            return value === other;
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