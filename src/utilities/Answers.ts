import Answer from "@/utilities/Answer";

export default class Answers {
  protected get cacheKey(): string {
    return 'answers';
  }

  protected answers: [Answer] | undefined;

  public constructor() {
    const json: string = window.sessionStorage.getItem(this.cacheKey) || 'null';
    this.answers = JSON.parse(json) || undefined;
  }

  public get all(): [Answer] | undefined {
    return this.answers;
  }

  public find(questionId: string): Answer | undefined {
    if (this.all === undefined) {
      return undefined;
    }

    return this.all.find(answer => answer.question_id === questionId);
  }

  public cache(answers: [Answer]): Answers {
    window.sessionStorage.setItem(this.cacheKey, JSON.stringify(answers));

    return this;
  }
};
