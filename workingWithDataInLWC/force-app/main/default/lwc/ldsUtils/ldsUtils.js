/**
 * Reduces one or more LDS errors into a string[] of error messages.
 * @param {FetchResponse|FetchResponse[]} errors
 * @return {String[]} Error messages
 */
export function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            // Remove null/undefined items
            .filter((error) => !!error)
            // Extract an error message
            .map((error) => {
                // UI API read errors
                if (Array.isArray(error.body)) return error.body.map((e) => e.message);
                // Page level errors
                if (error?.body?.pageErrors && error.body.pageErrors.length) {
                    return error.body.pageErrors.map((e) => e.message);
                }
                // Field level errors
                if (error?.body?.fieldErrors && Object.keys(error.body.fieldErrors).length) {
                    const fieldErrors = [];
                    Object.values(error.body.fieldErrors).forEach(
                        (errorArray) => {
                            fieldErrors.push(
                                ...errorArray.map((e) => e.message)
                            );
                        }
                    );
                    return fieldErrors;
                }
                // UI API DML page level errors
                if (error?.body?.output?.errors && error.body.output.errors.length) {
                    return error.body.output.errors.map((e) => e.message);
                }
                // UI API DML field level errors
                if (error?.body?.output?.fieldErrors && Object.keys(error.body.output.fieldErrors).length) {
                    const fieldErrors = [];
                    Object.values(error.body.output.fieldErrors).forEach(
                        (errorArray) => {
                            fieldErrors.push(
                                ...errorArray.map((e) => e.message)
                            );
                        }
                    );
                    return fieldErrors;
                }
                // UI API DML, Apex and network errors
                if (error.body && typeof error.body.message === 'string') return error.body.message;
                // JS errors
                if (typeof error.message === 'string') return error.message;
                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter((message) => !!message)
    );
}
