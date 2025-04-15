import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, FileText, Printer } from "lucide-react"

export function PatientRecordDetails() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Patient Record Details</CardTitle>
            <CardDescription>View detailed medical record information</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/thoughtful-artist.png" alt="Emma Johnson" />
                <AvatarFallback>EJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">Emma Johnson</h3>
                <div className="text-sm text-muted-foreground">Patient ID: P-1001</div>
                <div className="mt-1 flex items-center gap-4">
                  <div className="text-sm">DOB: May 15, 1985</div>
                  <div className="text-sm">Age: 38</div>
                  <Badge>Female</Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Last Visit: Apr 23, 2023</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Record Updated: Apr 23, 2023 10:30 AM</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>Record ID: MR-1001</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="space-y-4 pt-4">
              <div>
                <h4 className="text-sm font-medium">Diagnosis</h4>
                <p className="text-sm text-muted-foreground">Hypertension (Primary)</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Symptoms</h4>
                <p className="text-sm text-muted-foreground">
                  Patient reports occasional headaches, dizziness, and fatigue. No chest pain or shortness of breath.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Treatment Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Prescribed Lisinopril 10mg daily. Recommended lifestyle modifications including reduced sodium intake,
                  regular exercise, and stress management. Follow-up appointment scheduled in 3 months.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Attending Physician</h4>
                <p className="text-sm text-muted-foreground">Dr. Michael Chen, Cardiology</p>
              </div>
            </TabsContent>
            <TabsContent value="vitals" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Blood Pressure</div>
                  <div className="text-lg font-medium">138/85 mmHg</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Heart Rate</div>
                  <div className="text-lg font-medium">76 bpm</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Temperature</div>
                  <div className="text-lg font-medium">98.6 °F</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Respiratory Rate</div>
                  <div className="text-lg font-medium">16 rpm</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Weight</div>
                  <div className="text-lg font-medium">165 lbs</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Height</div>
                  <div className="text-lg font-medium">5'6"</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">BMI</div>
                  <div className="text-lg font-medium">26.6</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Oxygen Saturation</div>
                  <div className="text-lg font-medium">98%</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="medications" className="pt-4">
              <div className="rounded-lg border">
                <div className="grid grid-cols-5 border-b p-3 text-sm font-medium">
                  <div className="col-span-2">Medication</div>
                  <div>Dosage</div>
                  <div>Frequency</div>
                  <div>Status</div>
                </div>
                <div className="grid grid-cols-5 border-b p-3">
                  <div className="col-span-2">
                    <div className="font-medium">Lisinopril</div>
                    <div className="text-xs text-muted-foreground">ACE Inhibitor</div>
                  </div>
                  <div>10mg</div>
                  <div>Once daily</div>
                  <div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-5 border-b p-3">
                  <div className="col-span-2">
                    <div className="font-medium">Aspirin</div>
                    <div className="text-xs text-muted-foreground">Blood Thinner</div>
                  </div>
                  <div>81mg</div>
                  <div>Once daily</div>
                  <div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-5 p-3">
                  <div className="col-span-2">
                    <div className="font-medium">Atorvastatin</div>
                    <div className="text-xs text-muted-foreground">Statin</div>
                  </div>
                  <div>20mg</div>
                  <div>Once daily</div>
                  <div>
                    <Badge variant="destructive">Discontinued</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="space-y-4 pt-4">
              <div>
                <h4 className="text-sm font-medium">Clinical Notes</h4>
                <div className="mt-2 rounded-lg border p-3 text-sm">
                  <p className="mb-2">
                    <span className="font-medium">Apr 23, 2023 - Dr. Michael Chen:</span> Patient presents with elevated
                    blood pressure readings over the past 3 months. Home measurements averaging 140/90 mmHg. No family
                    history of cardiovascular disease. Patient reports high-stress work environment and inconsistent
                    exercise routine.
                  </p>
                  <p className="mb-2">
                    Physical examination unremarkable except for BP of 138/85 mmHg. ECG shows normal sinus rhythm. Basic
                    metabolic panel within normal limits. Lipid panel shows slightly elevated LDL at 130 mg/dL.
                  </p>
                  <p>
                    Assessment: Primary hypertension, Stage 1. Plan: Start Lisinopril 10mg daily. Lifestyle
                    modifications discussed in detail. Follow-up in 3 months with repeat labs. Referral to nutritionist
                    for dietary counseling.
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Previous Visit Notes</h4>
                <div className="mt-2 rounded-lg border p-3 text-sm">
                  <p className="mb-2">
                    <span className="font-medium">Jan 15, 2023 - Dr. Jennifer Smith:</span> Annual physical examination.
                    Patient reports good overall health. BP slightly elevated at 135/82 mmHg. Recommended monitoring BP
                    at home and returning for follow-up if consistently elevated.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Created by: <span className="font-medium">Dr. Michael Chen</span>
          </div>
          <Button>Edit Record</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
