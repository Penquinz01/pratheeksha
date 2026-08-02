import React from 'react';

/**
 * Renders `**bolded**` as <strong> and `*italic*` as <em> in body copy.
 *
 * Key statistics from the Annual Report have to carry emphasis, but the copy
 * itself lives in content.ts as plain strings. Marking them inline keeps the
 * emphasis attached to the sentence it belongs to — an editor updating a figure
 * changes one file and cannot leave the markup pointing at the wrong number.
 * No dangerouslySetInnerHTML: the text is split and wrapped as real elements.
 *
 * The bold pattern is tried first, so `**x**` is never mistaken for `*x*`.
 */
export function renderEmphasis(text: string): React.ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter((part) => part !== '')
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-brand-plum">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
}
