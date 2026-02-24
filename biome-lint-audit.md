# Biome Lint Audit Summary

- Command: `node_modules/.bin/biome check . --reporter=json`
- Exit code: 1
- Total diagnostics: 326
- Errors: 155
- Warnings: 171
- Fixable diagnostics (tagged): 221
- Non-fixable diagnostics: 105
- Files with diagnostics: 101

## By Severity

- warning: 171
- error: 155

## By Domain

- lint: 325
- format: 1

## Top Categories (first 20)

- lint/correctness/noUnusedVariables: 148
- lint/style/useTemplate: 25
- lint/complexity/noForEach: 23
- lint/correctness/useExhaustiveDependencies: 23
- lint/suspicious/noArrayIndexKey: 16
- lint/style/noUselessElse: 15
- lint/complexity/useOptionalChain: 13
- lint/style/useNodejsImportProtocol: 9
- lint/style/useSelfClosingElements: 9
- lint/style/noVar: 7
- lint/suspicious/noThenProperty: 7
- lint/a11y/useButtonType: 5
- lint/suspicious/noAssignInExpressions: 5
- lint/complexity/useLiteralKeys: 4
- lint/a11y/useKeyWithClickEvents: 3
- lint/a11y/noSvgWithoutTitle: 2
- lint/a11y/useIframeTitle: 2
- lint/suspicious/noDuplicateObjectKeys: 2
- format: 1
- lint/a11y/noLabelWithoutControl: 1

## Top Files (first 25)

- ./backend/routers/auth.router.test.js: 17
- ./backend/routers/grantpermission.router.js: 17
- ./backend/routers/slack.router.js: 12
- ./client/src/components/admin/dashboard/index.jsx: 11
- ./client/src/pages/ProjectLeaderDashboard.jsx: 11
- ./backend/routers/users.router.test.js: 10
- ./client/src/pages/CheckInForm.jsx: 10
- ./backend/routers/projects.router.test.js: 9
- ./client/src/components/Leaderboard.jsx: 9
- ./backend/workers/slackbot.js: 8
- ./client/src/components/dashboard/AttendeeTable.jsx: 8
- ./client/src/components/dashboard/RosterTable.jsx: 8
- ./backend/controllers/project.controller.js: 7
- ./backend/routers/events.router.test.js: 7
- ./backend/scripts/deleteProject/displays.js: 7
- ./client/src/components/user-admin/UserPermissionSearch.jsx: 7
- ./backend/routers/recurringEvents.router.test.js: 6
- ./backend/app.js: 5
- ./backend/controllers/event.controller.js: 5
- ./backend/routers/projectTeamMembers.router.test.js: 5
- ./client/src/components/admin/donutChart.jsx: 5
- ./client/src/components/DashboardUsers.jsx: 5
- ./backend/controllers/user.controller.js: 4
- ./client/src/components/admin/donutChartContainer.jsx: 4
- ./client/src/components/manageProjects/editPMs/editProjectMembers.jsx: 4
