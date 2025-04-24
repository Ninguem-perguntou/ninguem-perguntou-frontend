import { Card, CardContent, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import React from "react";
import { Fragment } from "react/jsx-runtime"

export const TeamsMembres = () => {
    const TEAM_MEMBERS = {
        authors: [
            "Ingrid Thauane Santos Oliveira",
            "Isabela de Moura Costa",
            "Matheus Borges Ribeiro",
            "Raquel Soares Miguel de Azevedo",
        ],
        developers: [
            "Artur Dantas Martins",
            "Paulo Abdiel Sardinha de Sousa Santos",
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card elevation={0} sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              color="var(--pink)"
              sx={{ mb: 3 }}
            >
              Nossa Equipe
            </Typography>
            <Grid container spacing={4}>
              <Grid>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Autores
                </Typography>
                <List dense>
                  {TEAM_MEMBERS.authors.map((author, index) => (
                    <Fragment key={`author-${index}`}>
                      <ListItem disablePadding sx={{ py: 1 }}>
                        <ListItemText
                          primary={author} 
                          primaryTypographyProps={{ variant: 'body1' }}
                        />
                      </ListItem>
                      {index < TEAM_MEMBERS.authors.length - 1 && (
                        <Divider component="li" />
                      )}
                    </Fragment>
                  ))}
                </List>
              </Grid>
              <Grid>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Desenvolvedores
                </Typography>
                <List dense>
                  {TEAM_MEMBERS.developers.map((developer, index) => (
                    <React.Fragment key={`dev-${index}`}>
                      <ListItem disablePadding sx={{ py: 1 }}>
                        <ListItemText 
                          primary={developer} 
                          primaryTypographyProps={{ variant: 'body1' }}
                        />
                      </ListItem>
                      {index < TEAM_MEMBERS.developers.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    )
}