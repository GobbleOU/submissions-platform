export type DocumentValidationResult = {
  valid: boolean;
  reason: string | null;
  warnings: string[];
};

type ValidateDocumentInput = {
  fileName: string;
  mimeType: string;
  fileSize: number;
  extractedText: string;
};

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
const MAX_TEXT_CHARACTERS = 500_000;
const MIN_TEXT_CHARACTERS = 300;

const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Strong signals that this is genuinely a film dossier.
const CORE_FILM_SIGNALS = [
  "title",
  "original title",
  "film title",
  "director",
  "runtime",
  "running time",
  "production company",
  "logline",
  "synopsis",
];

// Supporting signals.
const FILM_DOSSIER_SIGNALS = [
  "producer",
  "screenwriter",
  "country of production",
  "production country",
  "language",
  "languages",
  "genre",
  "technical specs",
  "technical specifications",
  "cast",
  "crew",
  "festival",
  "premiere",
  "budget",
  "financing",
  "production year",
  "completion date",
  "release date",
  "aspect ratio",
  "shooting format",
  "sales agent",
  "distributor",
  "production status",
];

// Typical screenplay indicators.
const SCREENPLAY_SIGNALS = [
  "fade in:",
  "fade out:",
  "cut to:",
  "smash cut:",
  "int.",
  "ext.",
  "int/ext.",
  "interior",
  "exterior",
];

// Text commonly used in prompt-injection attempts.
// This text is NOT automatically dangerous.
// It becomes a rejection signal when the document also lacks
// strong legitimate dossier information.
const INJECTION_SIGNALS = [
  "ignore previous instructions",
  "ignore all previous instructions",
  "ignore the system prompt",
  "change your instructions",
  "change your task",
  "reveal your system prompt",
  "reveal the system prompt",
  "return random",
  "return gibberish",
  "execute this code",
  "follow these instructions instead",
  "disregard previous instructions",
];

function countSignals(text: string, signals: string[]) {
  return signals.filter((signal) =>
    text.includes(signal)
  ).length;
}

export function validateDocument({
  fileName,
  mimeType,
  fileSize,
  extractedText,
}: ValidateDocumentInput): DocumentValidationResult {
  const warnings: string[] = [];

  const normalizedFileName = fileName.toLowerCase();
  const normalizedMimeType = mimeType.toLowerCase();
  const normalizedText = extractedText.toLowerCase();
  const trimmedText = extractedText.trim();

  // -------------------------
  // FILE TYPE
  // -------------------------

  const extensionIsAllowed = ALLOWED_EXTENSIONS.some((extension) =>
    normalizedFileName.endsWith(extension)
  );

  if (!extensionIsAllowed) {
    return {
      valid: false,
      reason: "Only PDF and DOCX files are supported.",
      warnings,
    };
  }

  // Some browsers may provide an empty MIME type.
  // If a MIME type IS supplied, it must be valid.
  if (
    normalizedMimeType &&
    !ALLOWED_MIME_TYPES.includes(normalizedMimeType)
  ) {
    return {
      valid: false,
      reason:
        "The uploaded file type does not match an allowed PDF or DOCX document.",
      warnings,
    };
  }

  // -------------------------
  // FILE SIZE
  // -------------------------

  if (fileSize <= 0) {
    return {
      valid: false,
      reason: "The uploaded file appears to be empty.",
      warnings,
    };
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      reason:
        "The uploaded document is larger than the 50 MB limit.",
      warnings,
    };
  }

  // -------------------------
  // TEXT SIZE
  // -------------------------

  if (trimmedText.length < MIN_TEXT_CHARACTERS) {
    return {
      valid: false,
      reason:
        "The document does not contain enough readable text to process.",
      warnings,
    };
  }

  if (trimmedText.length > MAX_TEXT_CHARACTERS) {
    return {
      valid: false,
      reason:
        "The document contains too much extracted text to process safely.",
      warnings,
    };
  }

  // -------------------------
  // DOCUMENT CONTENT
  // -------------------------

  const coreSignalCount = countSignals(
    normalizedText,
    CORE_FILM_SIGNALS
  );

  const dossierSignalCount = countSignals(
    normalizedText,
    FILM_DOSSIER_SIGNALS
  );

  const screenplaySignalCount = countSignals(
    normalizedText,
    SCREENPLAY_SIGNALS
  );

  const injectionSignalCount = countSignals(
    normalizedText,
    INJECTION_SIGNALS
  );

  console.log("Validation signal counts:", {
    coreSignalCount,
    dossierSignalCount,
    screenplaySignalCount,
    injectionSignalCount,
  });

  // -------------------------
  // SCREENPLAY DETECTION
  // -------------------------

  if (
    screenplaySignalCount >= 4 &&
    coreSignalCount < 4
  ) {
    return {
      valid: false,
      reason:
        "This document appears to be a screenplay rather than a film production dossier.",
      warnings,
    };
  }

  // -------------------------
  // PROMPT-INJECTION / GARBAGE
  // -------------------------

  if (
    injectionSignalCount > 0 &&
    coreSignalCount < 3
  ) {
    return {
      valid: false,
      reason:
        "This document contains suspicious instructions and does not contain enough legitimate film dossier information.",
      warnings,
    };
  }

  // A legitimate dossier may contain copied text that looks suspicious.
  // We allow it if enough real film data is present.
  if (
    injectionSignalCount > 0 &&
    coreSignalCount >= 3
  ) {
    warnings.push(
      "The document contains instruction-like text. It will be treated only as document content."
    );
  }

  // -------------------------
  // RELEVANCE CHECK
  // -------------------------

  // Require several strong film fields.
  if (coreSignalCount < 3) {
    return {
      valid: false,
      reason:
        "This document does not contain enough core film information to be treated as a production dossier.",
      warnings,
    };
  }

  // Also require supporting production/submission information.
  if (coreSignalCount + dossierSignalCount < 6) {
    return {
      valid: false,
      reason:
        "This document appears to contain too little production or submission information for reliable extraction.",
      warnings,
    };
  }

  // -------------------------
  // PASSED
  // -------------------------

  if (screenplaySignalCount >= 4) {
    warnings.push(
      "The document contains screenplay-like material, but also contains sufficient structured film production information."
    );
  }

  return {
    valid: true,
    reason: null,
    warnings,
  };
}