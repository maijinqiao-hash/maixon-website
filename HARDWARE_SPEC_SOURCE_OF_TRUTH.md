# MAIXON V5.9 Hardware Specification Source of Truth

Internal working reference. This file is not a public website asset.

## Shared printer platform facts

| Field | Status | Value | Notes |
| --- | --- | --- | --- |
| Maximum print width | Final | ≤ 63 cm | Applies to DFG604, DTF604 and DTF608. |
| Printhead model | Final for current website wording | Epson WF-7610 | Preserve the already confirmed project wording. |
| Voltage | Final common requirement | 220 V / 110 V | Same published requirement for all three printer platforms. |
| Printer shipping crate | Final | 2470 × 660 × 700 mm | Applies to DFG604, DTF604 and DTF608. Do not use 1750 × 960 × 860 mm. |

## DFG604

| Field | Status | Value |
| --- | --- | --- |
| Positioning | Final | Specialty process platform |
| Print architecture | Final wording boundary | 4-head class / same-class platform |
| Print speed | Final | 5 m²/h |
| Adhesive printing | Final | Yes |
| Interface | Final | USB |
| Power | Final | ≤ 3 kW |
| Printer dimensions | Final for current website | 1650 × 860 × 760 mm, same basic platform as DTF604 |
| Public applications | Final | Adhesive printing, metallic foil, banners, decorative heat transfer |
| Internal channel allocation | Not public | Do not explain reduced white channels on customer pages. |

## DTF604

| Field | Status | Value |
| --- | --- | --- |
| Positioning | Final | Standard DTF production platform |
| Printheads | Final | 4 |
| Print speed | Final | 8 m²/h |
| Interface | Final | USB |
| Power | Final | ≤ 3 kW |
| Color configuration | Final | CMYK + White |
| Printer dimensions | Final | 1650 × 860 × 760 mm |
| Dryer dimensions | Final | 1150 × 800 × 850 mm |
| Installed full-system footprint | Final | 1900 × 1670 × 1650 mm |
| Printer packed weight | Final | 195 kg |
| Printer packing volume | Final | 1.14 m³ |
| White ink system | Confirmed existing reference | 1200 ml supply, circulation, magnetic agitation; describe as reducing settling and supporting continuous output, never zero maintenance. |

## DTF608

| Field | Status | Value | Notes |
| --- | --- | --- | --- |
| Positioning | Final | High-speed volume production |
| Printheads | Final | 8, arranged as 2 × 4 | Two groups of four heads. |
| Print speed | Final | 18 m²/h | Primary product number. |
| Interface | Final | Ethernet / LAN | Use customer language around stable continuous data transfer. |
| Power | Final | 4200 W | Do not replace with ≤ 3 kW. |
| Machine transverse dimension | Approximate | About 200 mm larger than DTF604 | `FINAL DIMENSION TBD`. Do not invent absolute L × W × H. |
| Net weight | Approximate | About 40 kg more than DTF604 | Pending final weighing. Do not calculate and publish an absolute value. |
| Packed weight | Approximate | About 40 kg more than DTF604 | Pending final weighing. Do not calculate and publish an absolute value. |
| Printer shipping crate | Final | 2470 × 660 × 700 mm | Optimized packing keeps the common crate size. |

## OVEN604

| Field | Status | Value |
| --- | --- | --- |
| Shipping crate | Final | 810 × 930 × 1160 mm |
| Packed weight | Final | 139 kg |
| Packing volume | Final | 0.873 m³ |
| Primary customer value | Final | Produce, wind and cut finished sections while the line continues. |
| Take-up modes | Final | Traditional take-up / cut-and-use |
| Typical process reference | Final as adjustable reference | 70°C → 120°C → 150°C |
| Temperature caveat | Final | Adjust for material, powder and process. Never present the reference as fixed. |
| Cooling | Final | Built-in cooling path |
| Powder replenishment | Final public behavior | Weight-sensing automatic replenishment based on powder state; avoid exposing deeper sensor implementation. |
| Media path | Final public behavior | Curved path supporting a stable heating process. |

## Media status

- `hardware-dtf604`, `hardware-dtg604`, `hardware-dtf608`, `hardware-oven604` and `hardware-wf7610` remain `generated / provisional / replaceable` in the internal media manifest.
- Do not promote these machine images to final assets.
- No new machine imagery may be generated for this hardware pass.
- The user supplied two real DFG604 application photographs after the implementation began: `IMG_5192.jpeg` for metallic foil detail and `IMG_5190.jpeg` for the complete finished banner. The website uses non-destructive, color-preserving responsive WebP/AVIF derivatives under `public/hardware-assets/dfg604/`; the temporary source files remain untouched.
- The supplied Luxink product posters remain excluded from customer pages.
- The user also supplied two watermark-free, AI-generated black T-shirt concept images. They remain `source_type = generated`, `status = provisional`, `replaceable = true`; customer copy presents them as apparel design directions, not real production photography.

## Explicitly rejected legacy values

- DTF604 speed: 9.5–10 m²/h — rejected for the current website.
- DTF604 speed: 18.5 m²/h — rejected; DTF608 is the current eight-head high-speed model.
- Printer crate: 1750 × 960 × 860 mm — rejected.
- Oven crate: 1250 × 900 × 950 mm — rejected.
