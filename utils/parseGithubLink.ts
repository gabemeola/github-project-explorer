/**
 * Parses Github's rel header links.
 * Shamelessly copied
 * https://github.com/samverschueren/github-parse-link
 *
 * @param link - Response header link
 */
export default function parseGithubLink(link: string) {
  return link.split(', ').reduce((result, part) => {
    const match = part.match('<(.*?)>; rel="(.*?)"');

    if (match && match.length === 3) {
      // @ts-ignore
      result[match[2]] = match[1];
    }

    return result;
  }, {} as Record<'next' | 'prev' | 'last', string | undefined>);
}
