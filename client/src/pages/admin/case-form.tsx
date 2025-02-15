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
import { Loader2, ArrowLeft, Plus, X } from "lucide-react";
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
      petitioner: "",
      respondent: "",
      docketedDate: new Date().toISOString().split('T')[0],
      courtProceedings: [],
      partiesInvolved: [],
    },
    values: existingCase
      ? {
          caseNumber: existingCase.caseNumber,
          title: existingCase.title,
          description: existingCase.description,
          status: existingCase.status,
          petitioner: existingCase.petitioner,
          respondent: existingCase.respondent,
          docketedDate: new Date(existingCase.docketedDate).toISOString().split('T')[0],
          courtProceedings: existingCase.courtProceedings,
          partiesInvolved: existingCase.partiesInvolved,
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

  const addArrayField = (fieldName: "courtProceedings" | "partiesInvolved") => {
    const currentValues = form.getValues(fieldName) || [];
    form.setValue(fieldName, [...currentValues, ""]);
  };

  const removeArrayField = (fieldName: "courtProceedings" | "partiesInvolved", index: number) => {
    const currentValues = form.getValues(fieldName) || [];
    form.setValue(
      fieldName,
      currentValues.filter((_, i) => i !== index)
    );
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
      <Card className="max-w-3xl mx-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="petitioner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Petitioner</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter petitioner name..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="respondent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Respondent</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter respondent name..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="docketedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Docketed Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Court Proceedings</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField("courtProceedings")}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Proceeding
                  </Button>
                </div>
                {form.watch("courtProceedings")?.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`courtProceedings.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input {...field} placeholder="Enter court proceeding..." />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeArrayField("courtProceedings", index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Parties Involved</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField("partiesInvolved")}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Party
                  </Button>
                </div>
                {form.watch("partiesInvolved")?.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`partiesInvolved.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input {...field} placeholder="Enter party name..." />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeArrayField("partiesInvolved", index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

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