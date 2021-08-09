import { ConditionRawData } from ".";
import { ComponentDef } from "../components/types";

export interface Next {
  path: string;
  condition?: string;
}
export type Link = Next;

export interface Page {
  title: string;
  path: string;
  controller: string;
  components?: ComponentDef[];
  section: string; // the section ID
  next?: { path: string; condition?: string }[];
}

export interface Section {
  name: string;
  title: string;
}

export interface Item {
  text: string;
  value: string | number | boolean;
  description?: string;
  condition?: string;
}

export interface List {
  name: string;
  title: string;
  type: "string" | "number" | "boolean";
  items: Item[];
}

export interface Feedback {
  feedbackForm?: boolean;
  url?: string;
  emailAddress?: string;
}

export type PhaseBanner = {
  phase?: "alpha" | "beta";
  feedbackUrl?: string;
};

export type MultipleApiKeys = {
  test?: string;
  production?: string;
};

export enum OutputType {
  Email = "email",
  Notify = "notify",
  Webhook = "webhook",
}

export type EmailOutputConfiguration = {
  emailAddress: string;
};

export type NotifyOutputConfiguration = {
  apiKey: string;
  templateId: string;
  emailField: string;
  personalisation: string[];
  addReferencesToPersonalisation?: boolean;
};

export type WebhookOutputConfiguration = {
  url: string;
};

export type PrefilledFeeFields = {
  cardholderName: string;
  billingAddress: {
    line1: string;
    line2: string;
    postcode: string;
    city: string;
    country: string;
  };
};

export type Fee = {
  description: string;
  amount: number;
  multiplier?: any;
  multiplyBy?: number; // the value retrieved from multiplier field above (see summary page retrieveFees method)
  condition?: string;
};

export type OutputConfiguration =
  | EmailOutputConfiguration
  | NotifyOutputConfiguration
  | WebhookOutputConfiguration;

export type Output = {
  name: string;
  title: string;
  type: OutputType;
  outputConfiguration: OutputConfiguration;
};

export type SpecialPages = {
  confirmationPage?: {
    components: ComponentDef[];
  };
};

export function isMultipleApiKey(
  payApiKey: string | MultipleApiKeys | undefined
): payApiKey is MultipleApiKeys {
  let obj = payApiKey as MultipleApiKeys;
  return obj.test !== undefined || obj.production !== undefined;
}

/**
 * `FormDefinition` is a typescript representation of `Schema`
 */
export type FormDefinition = {
  pages: Page[];
  conditions: ConditionRawData[];
  lists: List[];
  sections: Section[];
  startPage?: Page["path"] | undefined;
  name?: string | undefined;
  feedback?: Feedback;
  phaseBanner?: PhaseBanner;
  fees: Fee[];
  prefilledPayFields?: Partial<PrefilledFeeFields>;
  skipSummary?: boolean | undefined;
  outputs: Output[];
  declaration?: string | undefined;
  metadata?: Record<string, any>;
  payApiKey?: string | MultipleApiKeys | undefined;
  specialPages?: SpecialPages;
};
