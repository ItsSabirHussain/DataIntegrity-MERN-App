import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Project Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="companyname"
            name="companyname"
            label="Company Name"
            fullWidth
            autoComplete="cname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="projectname"
            name="projectname"
            label="Project Name"
            fullWidth
            autoComplete="pname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="projectdescription"
            name="projectdescription"
            label="Project Description Line 1"
            fullWidth
            autoComplete="pdescription"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="projectdescription2"
            name="projectdescription2"
            label="Project Description Line 1"
            fullWidth
            autoComplete="pdescription2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="zip"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="deleverydate"
            name="deleverydate"
            label="Delevery Date (dd / mm / yyyy)"
            fullWidth
            autoComplete="ddate"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="budget"
            name="budget"
            label="Budget"
            fullWidth
            autoComplete="budget"
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
