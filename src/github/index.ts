export interface GitHubUser {
  name: string;
  avatarUrl: string;
}

export async function getViewer(token: string): Promise<GitHubUser> {
  const query = `
    query {
      viewer {
        name
        avatarUrl
      }
    }
  `;

  const resp = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  });

  const j = await resp.json();
  return j.data.viewer;
}
