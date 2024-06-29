"use client";

import FieldInfo from "@/components/FieldInfo";
import { Add } from "@mui/icons-material";
import {
  Button,
  Input,
  ModalFooter,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

export default function CreateLocator() {
  const form = useForm({
    defaultValues: {
      name: "",
      module: "",
      value: "",
      file: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch("/api/locators", {
          method: "POST",
          body: JSON.stringify(value),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          onClose();
        }
      } catch (error) {
        console.error(error);
      }
    },
    validatorAdapter: zodValidator(),
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color="primary" endContent={<Add />}>
        Create Locator
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create Locator
                </ModalHeader>
                <ModalBody>
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
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
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
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
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
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
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
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
                            }
                            errorMessage={field.state.meta.touchedErrors}
                          />
                        </>
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? "..." : "Submit"}
                      </Button>
                    )}
                  />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
