declare module 'nunjucks' {
    export function render(templateDir: string, params: {[key:string]: string}): string;
}