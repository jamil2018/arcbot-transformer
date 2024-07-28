"use client";

import { updateLocator } from "@/actions/locators";
import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Locator } from "@prisma/client";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { z } from "zod";

export default function EditLocator({
  locatorData,
  modalCloseHandler,
}: {
  locatorData: Locator;
  modalCloseHandler: () => void;
}) {
  const [showServerError, setShowServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const form = useForm({
    defaultValues: {
      ...locatorData,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await updateLocator(locatorData.id, value);
        if (!res.success) {
          setServerErrorMessage(res.message ? res.message : "Unknown error!!!");
          setShowServerError(true);
        }
        if (res.success) {
          setServerErrorMessage("");
          setShowServerError(false);
          modalCloseHandler();
        }
      } catch (error) {
        console.error(error);
      }
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Update</ModalHeader>
          <ModalBody>
            <div
              className={
                showServerError
                  ? "bg-danger-300 text-slate-300 p-4 rounded-lg"
                  : "bg-danger-300 text-slate-300 p-4 rounded-lg hidden"
              }
            >
              <p className="text-sm">{serverErrorMessage}</p>
            </div>
            <form.Field
              name="name"
              validators={{
                onChange: z.string().min(1, {
                  message: "At least a single character is required",
                }),
              }}
              children={(field) => {
                return (
                  <>
                    <Input
                      size="sm"
                      id={field.name}
                      label={
                        field.name.charAt(0).toUpperCase() + field.name.slice(1)
                      }
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      isInvalid={
                        field.state.meta.touchedErrors.length > 0 ? true : false
                      }
                      errorMessage={field.state.meta.touchedErrors}
                    />
                  </>
                );
              }}
            />
            <form.Field
              name="module"
              validators={{
                onChange: z.string().min(1, {
                  message: "At least a single character is required",
                }),
              }}
              children={(field) => {
                return (
                  <>
                    <Input
                      size="sm"
                      id={field.name}
                      label={
                        field.name.charAt(0).toUpperCase() + field.name.slice(1)
                      }
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      isInvalid={
                        field.state.meta.touchedErrors.length > 0 ? true : false
                      }
                      errorMessage={field.state.meta.touchedErrors}
                    />
                  </>
                );
              }}
            />
            <form.Field
              name="value"
              validators={{
                onChange: z.string().min(1, {
                  message: "At least a single character is required",
                }),
              }}
              children={(field) => {
                return (
                  <>
                    <Input
                      size="sm"
                      id={field.name}
                      label={
                        field.name.charAt(0).toUpperCase() + field.name.slice(1)
                      }
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      isInvalid={
                        field.state.meta.touchedErrors.length > 0 ? true : false
                      }
                      errorMessage={field.state.meta.touchedErrors}
                    />
                  </>
                );
              }}
            />
            <form.Field
              name="file"
              validators={{
                onChange: z.string().min(1, {
                  message: "At least a single character is required",
                }),
              }}
              children={(field) => {
                return (
                  <>
                    <Input
                      size="sm"
                      id={field.name}
                      label={
                        field.name.charAt(0).toUpperCase() + field.name.slice(1)
                      }
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      isInvalid={
                        field.state.meta.touchedErrors.length > 0 ? true : false
                      }
                      errorMessage={field.state.meta.touchedErrors}
                    />
                  </>
                );
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={modalCloseHandler}>Cancel</Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" color="primary" disabled={!canSubmit}>
                  {isSubmitting ? "..." : "Save"}
                </Button>
              )}
            />
          </ModalFooter>
        </ModalContent>
      </form>
    </>
  );
}
