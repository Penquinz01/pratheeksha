// Discovers the API's CRUD resources from its OpenAPI document.
// Any new backend feature module automatically becomes a section in the UI.
import { api } from "./client";

const EXCLUDED_TAGS = new Set(["Auth", "Health"]);

function deref(schemas, ref) {
  return schemas[ref.split("/").pop()];
}

// Pydantic renders optional fields as anyOf [X, null]; unwrap to the real type.
function fieldMeta(prop) {
  let p = prop;
  if (p.anyOf) p = p.anyOf.find((x) => x.type !== "null") ?? p.anyOf[0];
  return { type: p.type ?? "string", format: p.format ?? null };
}

export async function loadResources() {
  const doc = await api("/openapi.json");
  const schemas = doc.components.schemas;
  const resources = [];

  for (const [path, ops] of Object.entries(doc.paths)) {
    const post = ops.post;
    if (!post || !ops.get) continue; // collection endpoints only
    const tag = post.tags?.[0];
    if (!tag || EXCLUDED_TAGS.has(tag)) continue;

    const createSchema = deref(schemas, post.requestBody.content["application/json"].schema.$ref);
    const listRef = ops.get.responses["200"].content["application/json"].schema.items.$ref;
    const readSchema = deref(schemas, listRef);

    const fields = Object.entries(createSchema.properties).map(([name, prop]) => ({
      name,
      ...fieldMeta(prop),
      required: (createSchema.required ?? []).includes(name),
    }));
    const readColumns = Object.keys(readSchema.properties);
    const pk = readColumns.find((c) => !(c in createSchema.properties)) ?? readColumns[0];

    resources.push({
      key: path.replaceAll("/", ""),
      path,
      title: tag,
      fields,
      columns: readColumns,
      pk,
    });
  }
  return resources.sort((a, b) => a.title.localeCompare(b.title));
}
