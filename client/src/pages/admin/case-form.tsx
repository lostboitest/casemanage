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

  const addProceeding = () => {
    const currentProceedings = form.getValues("courtProceedings") || [];
    form.setValue("courtProceedings", [
      ...currentProceedings,
      { date: new Date().toISOString().split('T')[0], description: "" }
    ]);
  };

  const removeProceeding = (index: number) => {
    const currentProceedings = form.getValues("courtProceedings") || [];
    form.setValue(
      "courtProceedings",
      currentProceedings.filter((_, i) => i !== index)
    );
  };

  const addParty = () => {
    const currentParties = form.getValues("partiesInvolved") || [];
    form.setValue("partiesInvolved", [
      ...currentParties,
      { name: "", role: "", contact: "" }
    ]);
  };

  const removeParty = (index: number) => {
    const currentParties = form.getValues("partiesInvolved") || [];
    form.setValue(
      "partiesInvolved",
      currentParties.filter((_, i) => i !== index)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Section 1: Basic Case Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Case Information</h3>
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
              </div>

              {/* Section 2: Court Proceedings */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Court Proceedings</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addProceeding}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Proceeding
                  </Button>
                </div>

                <div className="space-y-4">
                  {form.watch("courtProceedings")?.map((proceeding, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1 space-y-4">
                        <FormField
                          control={form.control}
                          name={`courtProceedings.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`courtProceedings.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter proceeding details..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-8"
                        onClick={() => removeProceeding(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Parties Involved */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Parties Involved</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addParty}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Party
                  </Button>
                </div>

                <div className="space-y-4">
                  {form.watch("partiesInvolved")?.map((party, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1 space-y-4">
                        <FormField
                          control={form.control}
                          name={`partiesInvolved.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter party name..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`partiesInvolved.${index}.role`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter party role..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`partiesInvolved.${index}.contact`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Information</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter contact information..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-8"
                        onClick={() => removeParty(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
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