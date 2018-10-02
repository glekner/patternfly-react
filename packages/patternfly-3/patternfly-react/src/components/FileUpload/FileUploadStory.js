import React from 'react';
import { withInfo } from '@storybook/addon-info/dist/index';
import { inlineTemplate } from 'storybook/decorators/storyTemplates';
import { DOCUMENTATION_URL } from 'storybook/constants/siteConstants';
import { FileUpload } from '.';
import { Grid } from '../Grid';

export const FileUploadStory = stories => {
  stories.add(
    'FileUpload',
    withInfo()(() => {
      const text = {
        passive: 'or Drag & Drop',
        active: 'Drop files here',
        accept: 'Uploading',
        reject: 'File type is not supported',
        rejectAmount: 'File amount limit exceeded'
      };
      const icons = {
        passive: 'plus-circle',
        active: 'plus-circle',
        accept: 'chevron-circle-up',
        reject: 'exclamation-circle',
        rejectAmount: 'exclamation-circle'
      };
      const onDrop = accepted => {
        accepted.map(
          file =>
            // action(file.name)();
            file
        );
      };
      const story = (
        <Grid>
          <Grid.Row style={{ marginBottom: '20px', marginTop: '20px' }}>
            <Grid.Col xs={12} sm={6} md={6}>
              <FileUpload
                maxSize={10485760}
                maxAmount={3}
                acceptedTypes="image/jpeg, image/png"
                text={text}
                icons={icons}
                onDrop={onDrop}
                progressDone={21}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
      );
      return inlineTemplate({
        title: 'File Upload',
        documentationLink: `${DOCUMENTATION_URL.PATTERNFLY_ORG_FORMS}file-upload/#multiple-file-upload`,
        story
      });
    })
  );
};
