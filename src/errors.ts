export class AirgapQueryError extends Error {
  constructor(message: string, readonly code = "AIRGAPQUERY_ERROR") {
    super(message);
    this.name = "AirgapQueryError";
  }
}

export class UserInputError extends AirgapQueryError {
  constructor(message: string) {
    super(message, "USER_INPUT_ERROR");
    this.name = "UserInputError";
  }
}

export class EmptyCorpusError extends AirgapQueryError {
  constructor(rootDir: string) {
    super(`No supported text documents were found under ${rootDir}.`, "EMPTY_CORPUS");
    this.name = "EmptyCorpusError";
  }
}
