import { Controller, UseFormReturn } from 'react-hook-form';
import { FormInput } from '../../../components/ui/FormInput';
import { Textarea } from '../../../components/ui/Textarea';
import { NumberInput } from '../../../components/ui/NumberInput';
import type { TopicFormData } from './topic-form-schema';

interface TopicFormFieldsProps {
  form: UseFormReturn<TopicFormData>;
  isEditMode: boolean;
}

export function TopicFormFields({ form, isEditMode }: TopicFormFieldsProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <>
      {/* Topic Name */}
      <FormInput
        label="Topic Name"
        placeholder="E.g., Daily Motivation, Self-Love Affirmations"
        {...register('name')}
        error={errors.name?.message}
        required
      />

      {/* AI Prompt */}
      <Textarea
        label="AI Prompt"
        placeholder="Describe the tone, context, and recipient for the compliments. Be specific, kind, and detailed."
        rows={6}
        {...register('prompt')}
        error={errors.prompt?.message}
        helperText="AI prompts help shape how compliments are written. Be specific, kind, and detailed."
        required
      />

      {/* Number of Compliments - Only show in create mode */}
      {!isEditMode && (
        <Controller
          name="complimentCount"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="How many compliments to generate?"
              min={1}
              max={1000}
              {...field}
              value={field.value ?? 50}
              onChange={e => field.onChange(Number(e.target.value))}
              error={errors.complimentCount?.message}
              required
            />
          )}
        />
      )}
    </>
  );
}
