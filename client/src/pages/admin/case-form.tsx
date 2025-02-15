import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft } from "lucide-react";
import { insertCaseSchema, type Case } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CaseForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const { data: existingCase, isLoading: isLoadingCase } = useQuery<Case>({
    queryKey: [`/api/cases/${id}`],
    enabled: isEditing,
  });

  const form = useForm({
    resolver: zodResolver(insertCaseSchema),
    defaultValues: {
      caseNumber: "",
      title: "",
      description: "",
      status: "open",
    },
    values: existingCase
      ? {
          caseNumber: existingCase.caseNumber,
          title: existingCase.title,
          description: existingCase.description,
          status: existingCase.status,
        }
      : undefined,
  });

  const onSubmit = async (data: typeof form.getValues) => {
    try {
      if (isEditing) {
        await apiRequest("PATCH", `/api/cases/${id}`, data);
        toast({
          title: "Success",
          description: "Case updated successfully",
        });
      } else {
        await apiRequest("POST", "/api/cases", data);
        toast({
          title: "Success",
          description: "Case created successfully",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
      setLocation("/admin");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  if (isEditing && isLoadingCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? "Edit Case" : "New Case"}</CardTitle>
          <Button variant="outline" onClick={() => setLocation("/admin")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="caseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isEditing}
                        placeholder="Enter case number..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter case title..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter case description..."
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditing ? "Update Case" : "Create Case"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
