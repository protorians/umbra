export default function (viewHTML: string): string {
    return `
<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Protorians Vauban</title>
{{Vauban.Requirement.Head}}
</head>
<body>
${viewHTML}
{{Vauban.Requirement.Body}}
</body>
</html>
`;
}