export interface LoginDto {
  email: string;
  username: string;
  accessToken: string;
  exp: string;
}

export interface RequestConsumptionDto {
  id: string;
  userName: string;
  subscriptionPlan: number;
  desiredSubscriptionPlan: number;
  todayUploadCount: number;
  requestsTotal: number;
}

export const subscriptionOptions = [
  { value: 1, label: "FREE" },
  { value: 20, label: "PRO" },
  { value: 1000, label: "GOLD" },
];

export const getSubscriptionDisplay = (value: number | undefined) => {
  return subscriptionOptions.find((x) => x.value === value)?.label;
};
