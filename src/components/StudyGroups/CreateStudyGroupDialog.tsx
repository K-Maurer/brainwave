
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CreateStudyGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  description: string;
  isPrivate: boolean;
  maxMembers: number;
}

export function CreateStudyGroupDialog({ open, onOpenChange, onSuccess }: CreateStudyGroupDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      isPrivate: true,
      maxMembers: 10
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('study_groups')
        .insert({
          name: data.name,
          description: data.description,
          is_private: data.isPrivate,
          max_members: data.maxMembers
        });

      if (error) throw error;
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error creating study group:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Neue Lerngruppe erstellen</DialogTitle>
            <DialogDescription>
              Erstellen Sie eine neue Lerngruppe und laden Sie andere zum gemeinsamen Lernen ein.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name der Gruppe</Label>
              <Input
                id="name"
                {...register("name", { required: "Der Name ist erforderlich" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                {...register("description")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="private">Private Gruppe</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Nur eingeladene Mitglieder können beitreten
                </p>
              </div>
              <Switch
                id="private"
                {...register("isPrivate")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Abbrechen
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Gruppe erstellen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
