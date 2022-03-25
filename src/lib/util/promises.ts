export const pr = <R>(
    runner: (
        resolver: (value: R, err: any) => any,
        flipped: (err: any, value: R) => any,
    ) => any,
): Promise<R> => {
    return new Promise((resolve, reject) => {
        runner(
            (value, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            },
            (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            },
        );
    });
};

export function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
