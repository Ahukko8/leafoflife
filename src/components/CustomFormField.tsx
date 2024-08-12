"use client";

import { Control } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-[#62A83c] bg-[#62A83c]">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "ICON"}
              height={22}
              width={22}
              className="mt-0"
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="border-0 focus-visible:ring-0 h-11 focus-visible:ring-offset-0"
            />
          </FormControl>
        </div>
      );

      case FormFieldType.PHONE_INPUT:
        return (
            <FormControl>
                <PhoneInput
                    defaultCountry="MV"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value}
                    onChange={field.onChange}
                    className="mt-2 h-11 rounded-md px-3 text-sm border bg-white placeholder:text-white border-[#62A83c]"




                
                />
            </FormControl>
        )
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
