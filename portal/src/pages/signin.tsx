import Button from "components/buttons/Button";
import Card from "components/layout/Card";
import Col from "components/layout/Col";
import Page from "components/layout/Page";
import type { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import React, { FC } from "react";

const SignInPage: NextPage<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = (props) => {
  const { providers } = props;

  return (
    <Page>
      <Col className="items-center self-center py-12 px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Sign in to your account
        </h2>
        <Card className="mt-10 max-w-96 w-full space-y-5">
          {Object.keys(providers).map((e) => (
            <SocialButton key={e} provider={e} />
          ))}
        </Card>
      </Col>
    </Page>
  );
};

export default SignInPage;

const SocialButton: FC<{
  provider: string;
}> = (props) => {
  const { provider } = props;

  function getLabel() {
    switch (provider) {
      case "google":
        return "Google";
      case "twitter":
        return "Twitter";
      case "facebook":
        return "Facebook";
      case "coinbase":
        return "Coinbase";
    }
  }
  function getIcon() {
    switch (provider) {
      case "google":
        return (
          <path d="M 10 8.773438 L 18.089844 8.773438 C 18.179688 9.269531 18.226562 9.746094 18.226562 10.199219 C 18.226562 11.816406 17.886719 13.257812 17.210938 14.527344 C 16.53125 15.792969 15.566406 16.785156 14.3125 17.5 C 13.058594 18.214844 11.621094 18.570312 10 18.570312 C 8.832031 18.570312 7.71875 18.347656 6.664062 17.894531 C 5.605469 17.445312 4.695312 16.835938 3.929688 16.070312 C 3.164062 15.304688 2.554688 14.394531 2.105469 13.335938 C 1.652344 12.28125 1.429688 11.167969 1.429688 10 C 1.429688 8.832031 1.652344 7.71875 2.105469 6.664062 C 2.554688 5.605469 3.164062 4.695312 3.929688 3.929688 C 4.695312 3.164062 5.605469 2.554688 6.664062 2.105469 C 7.71875 1.652344 8.832031 1.429688 10 1.429688 C 12.230469 1.429688 14.148438 2.175781 15.746094 3.671875 L 13.414062 5.914062 C 12.5 5.03125 11.363281 4.585938 10 4.585938 C 9.039062 4.585938 8.152344 4.828125 7.339844 5.3125 C 6.523438 5.796875 5.878906 6.453125 5.402344 7.28125 C 4.925781 8.113281 4.6875 9.019531 4.6875 10 C 4.6875 10.980469 4.925781 11.886719 5.402344 12.71875 C 5.878906 13.546875 6.523438 14.203125 7.339844 14.6875 C 8.152344 15.171875 9.039062 15.414062 10 15.414062 C 10.648438 15.414062 11.242188 15.324219 11.785156 15.144531 C 12.328125 14.964844 12.773438 14.742188 13.125 14.476562 C 13.476562 14.207031 13.78125 13.902344 14.039062 13.558594 C 14.300781 13.21875 14.492188 12.894531 14.613281 12.589844 C 14.738281 12.285156 14.820312 11.992188 14.867188 11.71875 L 10 11.71875 Z M 10 8.773438 " />
        );
      case "twitter":
        return (
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        );
      case "facebook":
        return (
          <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
        );
    }
  }
  return (
    <Button
      variant="outlined"
      className="w-full flex items-center justify-center space-x-4"
      onClick={() => signIn(provider)}
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        fill="black"
        viewBox="0 0 20 20"
      >
        {getIcon()}
      </svg>
      <span>Sign in with {getLabel()}</span>
    </Button>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: {
      providers: providers,
    },
  };
};
