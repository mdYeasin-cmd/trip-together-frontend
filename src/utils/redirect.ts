import { ReadonlyURLSearchParams, useRouter } from "next/navigation";

export const redirectToLogin = (
  router: ReturnType<typeof useRouter>,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const currentUrl =
    pathname + (searchParams.toString() ? `?${searchParams}` : "");
  router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
};
