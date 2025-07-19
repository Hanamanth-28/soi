"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Info } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { soilTypes, cropCategories } from "@/lib/data"
import { analyzeData } from "@/lib/analyze"

const formSchema = z.object({
  soilType: z.string().min(1, { message: "Please select a soil type" }),
  cropType: z.string().min(1, { message: "Please select a crop" }),
  nitrogen: z.coerce.number().min(0, { message: "Must be a positive number" }),
  phosphorous: z.coerce.number().min(0, { message: "Must be a positive number" }),
  potassium: z.coerce.number().min(0, { message: "Must be a positive number" }),
  ph: z.coerce.number().min(0, { message: "Must be at least 0" }).max(14, { message: "Must be at most 14" }),
  humidity: z.coerce.number().min(0, { message: "Must be at least 0%" }).max(100, { message: "Must be at most 100%" }),
})

type FormValues = z.infer<typeof formSchema>

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any[] | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soilType: "",
      cropType: "",
      nitrogen: undefined,
      phosphorous: undefined,
      potassium: undefined,
      ph: undefined,
      humidity: undefined,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Use the mock analysis function
      const result = analyzeData(data)
      setRecommendations(result.recommendations)
    } catch (error) {
      console.error("Error analyzing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="border-none shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 text-white rounded-t-xl p-8">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M12 2v8"></path>
                  <path d="M4.93 10.93 8.5 7.36"></path>
                  <path d="M2 16h12"></path>
                  <path d="M18 12a6 6 0 0 0-6 6"></path>
                  <path d="M12 22a10 10 0 0 0 10-10"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-center">Soil Amendment & Crop Growth Advisor</h1>
              <p className="text-white/80 text-center max-w-xl">
                Optimize your soil conditions for better crop yield with our advanced analysis tool
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="soilType" className="text-base font-medium">
                    Soil Type
                  </Label>
                  <Select
                    onValueChange={(value) => form.setValue("soilType", value)}
                    defaultValue={form.getValues("soilType")}
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil.value} value={soil.value}>
                          {soil.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.soilType && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.soilType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropType" className="text-base font-medium">
                    Crop Selection
                  </Label>
                  <Select
                    onValueChange={(value) => form.setValue("cropType", value)}
                    defaultValue={form.getValues("cropType")}
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropCategories.map((category) => (
                        <SelectGroup key={category.label}>
                          <SelectLabel>{category.label}</SelectLabel>
                          {category.crops.map((crop) => (
                            <SelectItem key={crop.value} value={crop.value}>
                              {crop.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.cropType && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.cropType.message}</p>
                  )}
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                  Soil Nutrients
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="nitrogen" className="text-base">
                        Nitrogen (N)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">Measured in PPM (Parts Per Million)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter value"
                      {...form.register("nitrogen")}
                      className="h-12"
                    />
                    {form.formState.errors.nitrogen && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.nitrogen.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="phosphorous" className="text-base">
                        Phosphorous (P)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">Measured in PPM (Parts Per Million)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter value"
                      {...form.register("phosphorous")}
                      className="h-12"
                    />
                    {form.formState.errors.phosphorous && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.phosphorous.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="potassium" className="text-base">
                        Potassium (K)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">Measured in PPM (Parts Per Million)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter value"
                      {...form.register("potassium")}
                      className="h-12"
                    />
                    {form.formState.errors.potassium && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.potassium.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M8 2h8"></path>
                    <path d="M12 14v7"></path>
                    <path d="M12 14a5 5 0 0 0 5-5c0-2-2-3-2-3s.5-2-1-3c-1-1-3 0-3 0s-2-1-3 0c-1.5 1-1 3-1 3s-2 1-2 3a5 5 0 0 0 5 5Z"></path>
                  </svg>
                  Soil Conditions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ph" className="text-base">
                        Soil pH
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">pH scale ranges from 0 to 14</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      placeholder="Enter value (0-14)"
                      {...form.register("ph")}
                      className="h-12"
                    />
                    {form.formState.errors.ph && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.ph.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="humidity" className="text-base">
                        Humidity
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">Percentage (0-100%)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      placeholder="Enter value (0-100%)"
                      {...form.register("humidity")}
                      className="h-12"
                    />
                    {form.formState.errors.humidity && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.humidity.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 h-auto text-lg font-medium rounded-xl transition-transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Get Recommendations"
                  )}
                </Button>
              </div>
            </form>

            {recommendations && (
              <div className="mt-12 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-center">
                  <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-24 mb-6"></div>
                </div>
                <h2 className="text-2xl font-bold text-center text-emerald-800 dark:text-emerald-300 mb-8">
                  Soil Amendment Recommendations
                </h2>

                <Accordion type="single" collapsible className="w-full">
                  {recommendations.map((rec, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className={`mb-4 border rounded-xl overflow-hidden ${
                        rec.type === "success"
                          ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                          : "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20"
                      }`}
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          {rec.type === "success" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-green-600 dark:text-green-400"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-amber-600 dark:text-amber-400"
                            >
                              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                              <line x1="12" y1="9" x2="12" y2="13"></line>
                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                          )}
                          <span
                            className={`font-semibold ${
                              rec.type === "success"
                                ? "text-green-800 dark:text-green-300"
                                : "text-amber-800 dark:text-amber-300"
                            }`}
                          >
                            {rec.parameter}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-0">
                        <div className="space-y-3">
                          <p className="text-gray-700 dark:text-gray-300">{rec.message}</p>
                          <div className="pt-2">
                            <h4 className="text-sm font-semibold mb-1">Recommended Action:</h4>
                            <p className="text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-emerald-500">
                              {rec.action}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setRecommendations(null)}
                    className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-950"
                  >
                    Reset Analysis
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Soil Amendment and Crop Growth Advisor. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
