import React from 'react';

/**
 * Renders `**bolded**` spans in body copy as <strong>.
 *
 * Key statistics from the Annual Report have to carry emphasis, but the copy
 * itself lives in content.ts as plain strings. Marking them inline keeps the
 * emphasis attached to the sentence it belongs to — an editor updating a figure
 * changes one file and cannot leave the markup pointing at the wrong number.
 * No dangerouslySetInnerHTML: the text is split and wrapped as real elements.
 */
export function renderEmphasis(text: string): React.ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((part) => part !== '')
    .map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={index} className="font-semibold text-brand-forest">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
}
