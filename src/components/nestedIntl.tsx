import { useIntl } from "react-intl";

const nestedIntl = () => {
  const intl = useIntl();
  return (
    <div>
      {intl.formatMessage(
        {
          id: "15957bd8-aee8-4d17-bff4-495181e36397",
          defaultMessage: "Hello {honorific}",
        },
        {
          honorific: intl.formatMessage(
            {
              id: "1d798f31-7834-4079-ba1f-e2c0badacf96",
              defaultMessage: "Mr. {name} {nickname}",
            },
            {
              name: intl.formatMessage({
                id: "96c9cbfc-667d-4e50-b83a-6904b65e9358",
                defaultMessage: "Morpheus",
              }),
              nickname: intl.formatMessage({
                id: "31e1e906-2ea5-4c4e-9e07-afce8490c011",
                defaultMessage: "Sandman",
              }),
            }
          ),
        }
      )}
    </div>
  );
};

export default nestedIntl;
