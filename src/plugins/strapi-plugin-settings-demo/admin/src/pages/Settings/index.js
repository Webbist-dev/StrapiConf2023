import React, { memo, useEffect, useState } from "react";
import { CheckPagePermissions } from "@strapi/helper-plugin";
import { Button, Box, Typography } from "@strapi/design-system";
import { HeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import { Field, FieldLabel, FieldInput } from "@strapi/design-system/Field";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import pluginPermissions from '../../permissions';
import pluginId from "../../utils/pluginId";
import axios from "../../utils/axiosInstance";

const SettingsContainer = () => {
  const [apiError, setApiError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(async () => {
    try {
      const results = await axios(`/${pluginId}/config`, { method: "GET" });

      setToken(results.data.token || "");

    } catch ({ message }) {
      setApiError(message);
    }

    setIsLoading(false);
  }, [setIsLoading, setToken, setApiError]);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      await axios(`/${pluginId}/config`, {
        method: "POST",
        data: {
          token
        },
      });
    } catch ({ message }) {
      setApiError(message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <CheckPagePermissions permissions={pluginPermissions['settings.config']}>
        {isLoading && (
          <Flex justifyContent="center">
            <Loader>Loading settings...</Loader>
          </Flex>
        )}

        {apiError && (
          <Box padding={8} background="neutral100">
            <Typography textColor="neutral800">Something went wrong. {apiError}</Typography>
          </Box>
        )}

        {(!isLoading && !apiError) && (
          <div>
            <Box
              paddingLeft={10}
              paddingRight={10}
              paddingTop={2}
              paddingBottom={2}
            >
              <Stack>
                <Box marginBottom={6} marginTop={6}>
                  <Flex gap={2} marginBottom={6} marginTop={6} direction="column" alignItems="flex-start">
                    <Field>
                      <FieldLabel>
                        <Typography textColor="neutral800">
                          Example API Token
                        </Typography>
                      </FieldLabel>
                      <FieldInput
                        style={{ minWidth: 445 }}
                        type="text"
                        name="token"
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter your API token"
                        value={token}
                      />
                    </Field>
                  </Flex>
                </Box>
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex justifyContent="flex-end">
                    <Button onClick={handleSave}>
                      Save
                    </Button>
                  </Flex>
                </Flex>
              </Stack>
            </Box>
          </div>
        )}
      </CheckPagePermissions>
    </>
  );
};

const SettingsPage = () => {
  return (
    <>
      <Box background="neutral100">
        <HeaderLayout title={"Configuration"} as="h2" />
      </Box>
      <SettingsContainer />
    </>
  );
};

export default memo(SettingsPage);