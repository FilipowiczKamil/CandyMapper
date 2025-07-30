export interface ContactPayload {
  websiteId: string;
  widgetId: string;
  pageId: string;
  accountId: string;
  domainName: string;
  optedToSubscribe: boolean;
  locale: string;
  metadata: {
    formIdentifier: string;
    pathName: string;
    deviceType: string;
    deviceOs: string;
    browserName: string;
  };
  formData: ContactFormField[];
  recaptchaToken: string;
}

export interface ContactFormField {
  label:
    | 'First Name'
    | 'Last Name'
    | 'Email'
    | 'By entering a Phone Number you agree to our SMS Terms of Service'
    | 'Message'
    | '_app_id';
  value: string;
  replyTo?: boolean;
}
