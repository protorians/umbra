export default function (viewSource: string): string{
    return `<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<title>Protorians Vauban</title>
{{Vauban.Requirement.Head}}
</head>
<body>
${viewSource}
{{Vauban.Requirement.Body}}
</body>
</html>`;
}