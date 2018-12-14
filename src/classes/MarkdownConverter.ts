const Showdown = require("showdown");

class MarkdownConverter {
  private showdownConverter: any;

  constructor() {
    const classMap: any = {};
    const bindings = Object.keys(classMap).map(key => ({
      type: "output",
      regex: new RegExp(`<${key}>`, "g"),
      replace: `<${key} class="${classMap[key]}">`
    }));
    this.showdownConverter = new Showdown.Converter({
      extensions: [...bindings],
      noHeaderId: true
    });
  }

  toHtml(markdown: string) {
    return this.showdownConverter.makeHtml(markdown);
  }
}

export default new MarkdownConverter();
