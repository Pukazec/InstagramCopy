export interface LoginDto {
  email: string;
  username: string;
  accessToken: string;
  exp: string;
}

export const subscriptionOptions = [
  { value: 1, label: "FREE" },
  { value: 20, label: "PRO" },
  { value: 1000, label: "GOLD" },
];

export const getSubscriptionDisplay = (value: any) => {
  return subscriptionOptions.find((x) => x.value === value)?.label;
};
