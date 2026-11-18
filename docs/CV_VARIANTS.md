# Role-specific CV variants

The portfolio keeps one general Spanish and English CV under the existing public paths. Additional application-ready variants are generated from the same factual source in `scripts/cv_content.py`.

## Available profiles

- `power-platform`: prioritizes Power Apps, Dataverse, Power Automate, SharePoint, governance, and release practices.
- `development-supervisor`: prioritizes requirements discovery, feasibility, estimation, prioritization, delegation, delivery, and team enablement.
- `software-developer`: prioritizes .NET, APIs, data, React, TypeScript, integrations, testing, and hands-on implementation.

Each profile has Spanish and English DOCX/PDF versions. Spanish includes the professional photo; English remains text-only and ATS-first.

## Output locations

- Editable files: `documents/cv/variants/`
- Application PDFs: `public/cv/variants/`
- Verified PDF copies: `output/pdf/variants/`

These variants are intentionally not linked from the public portfolio header. Choose the closest version for each vacancy and review the vacancy-specific terminology before submitting it. Do not add keywords for technologies or responsibilities that Joaquín cannot support in an interview.

## Regeneration

Use the bundled workspace Python runtime:

```powershell
<workspace-python> scripts/build_cvs.py
<workspace-python> scripts/build_cv_pdfs.py
<workspace-python> scripts/verify_cvs.py
```

After any content or layout change, render every DOCX and PDF, inspect all one-page outputs, and run `npm run validate`.
