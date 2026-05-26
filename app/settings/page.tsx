"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Palette, Bell, Activity, Moon, Sun, Monitor, CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  const [dashboardView, setDashboardView] = useState<"technical" | "executive">("technical")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [desktopNotifications, setDesktopNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--msc-text-primary)]">Settings</h1>
          <p className="mt-1 text-sm text-[var(--msc-text-muted)]">
            Manage your profile, branding, and preferences
          </p>
        </div>
      </div>

      {/* Settings Card */}
      <Card
        className="border-[var(--msc-border)] bg-[var(--msc-card)]"
        data-testid="protocol-readiness-card"
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1D9E75]/10">
              <Settings className="h-5 w-5 text-[#1D9E75]" />
            </div>
            <div>
              <CardTitle className="text-lg">My Dashboard</CardTitle>
              <p className="text-sm text-[var(--msc-text-muted)]">
                Manage your profile, branding, and preferences
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preferences" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#141414]">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-[#1D9E75] data-[state=active]:text-white">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="branding" className="gap-2 data-[state=active]:bg-[#1D9E75] data-[state=active]:text-white">
                <Palette className="h-4 w-4" />
                Branding
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2 data-[state=active]:bg-[#1D9E75] data-[state=active]:text-white">
                <Bell className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2 data-[state=active]:bg-[#1D9E75] data-[state=active]:text-white">
                <Activity className="h-4 w-4" />
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#1D9E75]" />
                  <div>
                    <p className="font-medium text-[var(--msc-text-primary)]">Profile Settings</p>
                    <p className="text-sm text-[var(--msc-text-muted)]">
                      Manage your account information
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#1D9E75]/10 text-[#1D9E75]">Coming Soon</Badge>
              </div>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="mt-6">
              <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#1D9E75]" />
                  <div>
                    <p className="font-medium text-[var(--msc-text-primary)]">Branding Settings</p>
                    <p className="text-sm text-[var(--msc-text-muted)]">
                      Customize your workspace appearance
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#1D9E75]/10 text-[#1D9E75]">Coming Soon</Badge>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="mt-6 space-y-6">
              {/* Theme Selection */}
              <div>
                <Label className="text-sm font-medium text-[var(--msc-text-muted)]">Theme</Label>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      theme === "dark"
                        ? "border-[#1D9E75] bg-[#1D9E75]/10"
                        : "border-[var(--msc-border)] bg-[#141414] hover:bg-[var(--msc-card-hover)]"
                    }`}
                  >
                    <Moon className={`h-6 w-6 ${theme === "dark" ? "text-[#1D9E75]" : "text-[var(--msc-text-muted)]"}`} />
                    <span className={`text-sm ${theme === "dark" ? "text-[#1D9E75]" : "text-[var(--msc-text-primary)]"}`}>
                      Dark
                    </span>
                    {theme === "dark" && <CheckCircle2 className="h-4 w-4 text-[#1D9E75]" />}
                  </button>
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      theme === "light"
                        ? "border-[#1D9E75] bg-[#1D9E75]/10"
                        : "border-[var(--msc-border)] bg-[#141414] hover:bg-[var(--msc-card-hover)]"
                    }`}
                  >
                    <Sun className={`h-6 w-6 ${theme === "light" ? "text-[#1D9E75]" : "text-[var(--msc-text-muted)]"}`} />
                    <span className={`text-sm ${theme === "light" ? "text-[#1D9E75]" : "text-[var(--msc-text-primary)]"}`}>
                      Light
                    </span>
                    {theme === "light" && <CheckCircle2 className="h-4 w-4 text-[#1D9E75]" />}
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      theme === "system"
                        ? "border-[#1D9E75] bg-[#1D9E75]/10"
                        : "border-[var(--msc-border)] bg-[#141414] hover:bg-[var(--msc-card-hover)]"
                    }`}
                  >
                    <Monitor className={`h-6 w-6 ${theme === "system" ? "text-[#1D9E75]" : "text-[var(--msc-text-muted)]"}`} />
                    <span className={`text-sm ${theme === "system" ? "text-[#1D9E75]" : "text-[var(--msc-text-primary)]"}`}>
                      System
                    </span>
                    {theme === "system" && <CheckCircle2 className="h-4 w-4 text-[#1D9E75]" />}
                  </button>
                </div>
              </div>

              {/* Default Dashboard View */}
              <div>
                <Label className="text-sm font-medium text-[var(--msc-text-muted)]">Default Dashboard View</Label>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDashboardView("technical")}
                    className={`flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors ${
                      dashboardView === "technical"
                        ? "border-[#1D9E75] bg-[#1D9E75]/10"
                        : "border-[var(--msc-border)] bg-[#141414] hover:bg-[var(--msc-card-hover)]"
                    }`}
                  >
                    <span className={`font-medium ${dashboardView === "technical" ? "text-[#1D9E75]" : "text-[var(--msc-text-primary)]"}`}>
                      Technical
                    </span>
                    <span className="text-sm text-[var(--msc-text-muted)]">Kanban board with task details</span>
                  </button>
                  <button
                    onClick={() => setDashboardView("executive")}
                    className={`flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors ${
                      dashboardView === "executive"
                        ? "border-[#1D9E75] bg-[#1D9E75]/10"
                        : "border-[var(--msc-border)] bg-[#141414] hover:bg-[var(--msc-card-hover)]"
                    }`}
                  >
                    <span className={`font-medium ${dashboardView === "executive" ? "text-[#1D9E75]" : "text-[var(--msc-text-primary)]"}`}>
                      Executive
                    </span>
                    <span className="text-sm text-[var(--msc-text-muted)]">Charts and summary metrics</span>
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <Label className="text-sm font-medium text-[var(--msc-text-muted)]">Notifications</Label>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
                    <div>
                      <p className="font-medium text-[var(--msc-text-primary)]">Email Notifications</p>
                      <p className="text-sm text-[var(--msc-text-muted)]">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      className="data-[state=checked]:bg-[#1D9E75]"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
                    <div>
                      <p className="font-medium text-[var(--msc-text-primary)]">Desktop Notifications</p>
                      <p className="text-sm text-[var(--msc-text-muted)]">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={desktopNotifications}
                      onCheckedChange={setDesktopNotifications}
                      className="data-[state=checked]:bg-[#1D9E75]"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
                    <div>
                      <p className="font-medium text-[var(--msc-text-primary)]">Weekly Digest</p>
                      <p className="text-sm text-[var(--msc-text-muted)]">{"Summary of your week's activity"}</p>
                    </div>
                    <Switch
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                      className="data-[state=checked]:bg-[#1D9E75]"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-[var(--msc-border)]">
                  Cancel
                </Button>
                <Button className="bg-[#1D9E75] text-white hover:bg-[#1D9E75]/90">
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="mt-6">
              <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#1D9E75]" />
                  <div>
                    <p className="font-medium text-[var(--msc-text-primary)]">Activity Log</p>
                    <p className="text-sm text-[var(--msc-text-muted)]">
                      View your recent activity and actions
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#1D9E75]/10 text-[#1D9E75]">Coming Soon</Badge>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
