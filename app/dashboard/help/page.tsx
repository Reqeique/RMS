import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Help & Support</h1>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help topics..."
              className="pl-10 py-6 text-lg bg-white dark:bg-[#1F1F23] border-gray-200 dark:border-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Our support team is available 24/7 to help you with any questions or issues.
              </p>
              <Button className="w-full">Contact Support</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Browse our comprehensive guides</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Find detailed information about how to use all features of the system.
              </p>
              <Button variant="outline" className="w-full">
                View Documentation
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I add a new staff member?</AccordionTrigger>
                <AccordionContent>
                  To add a new staff member, navigate to the Staff Management page and click the "Add Staff" button in
                  the top right corner. Fill in the required information and click "Save".
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How can I view feedback analytics?</AccordionTrigger>
                <AccordionContent>
                  You can view feedback analytics by navigating to the Analytics page from the sidebar. This page
                  provides comprehensive insights into customer feedback, including sentiment analysis and trends over
                  time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I respond to customer feedback?</AccordionTrigger>
                <AccordionContent>
                  To respond to customer feedback, go to the Feedback Management page, find the feedback you want to
                  respond to, and click on "View Details". From there, you can add your response and mark the feedback
                  as resolved.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I set up a digital kiosk?</AccordionTrigger>
                <AccordionContent>
                  To set up a digital kiosk, navigate to the Digital Kiosks page and click "Add New Kiosk". Follow the
                  setup wizard to configure the kiosk, including its location and feedback form settings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How can I customize the feedback form?</AccordionTrigger>
                <AccordionContent>
                  You can customize the feedback form by going to the Feedback Form page in the sidebar. From there, you
                  can modify the questions, add or remove fields, and change the appearance of the form.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
