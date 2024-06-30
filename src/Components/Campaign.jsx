import React, { useState } from 'react';
import InputFileUpload from './CampaignButton';
import ColorTabs from '../TableBody/CampaignTable';
import AddBanner from './Popups/AddBanner';
import AddPrivacyPolicy from './Popups/AddPrivacyPolicy';
import AddFAQs from './Popups/AddFAQs';
import Banner from './Campaign/Banner';

function Campaign() {
  const [openDialog, setOpenDialog] = useState(null); // State to manage which dialog is open
  const [editedRow, setEditedRow] = useState(null); // State to manage edited row data
  const [selectedTab, setSelectedTab] = useState('one'); // State to manage selected tab

  const handleOpenDialog = (dialogType) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
    setEditedRow(null);
  };

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <div className="product-categories-header">   
        <div className="product-categories-header-text">
          <h1>Campaign (CMS)</h1>
          <p>View All Appointments</p>
        </div>
      </div>
      <div className="product-categories-header-btn" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <InputFileUpload addTitle={'Add Banner'} onClick={() => handleOpenDialog('AddBanner')} />
        <InputFileUpload addTitle={'Privacy Policies'} onClick={() => handleOpenDialog('AddPrivacyPolicy')} />
        <InputFileUpload addTitle={'Add FAQ\'s'} onClick={() => handleOpenDialog('AddFAQs')} />
      </div>
      <div className="table">
        <ColorTabs onTabChange={handleTabChange} />
        <div className="table-body">
          {selectedTab === 'one' && <Banner />}
          {/* {selectedTab === 'two' && <Policies />}
          {selectedTab === 'three' && <FAQs />} */}
        </div>
      </div>

      {openDialog === 'AddBanner' && (
        <AddBanner
          open={true}
          handleClose={handleCloseDialog}
          title="Add Banner"
          btnText="Add"
          editedRow={editedRow}
        />
      )}
      {openDialog === 'AddPrivacyPolicy' && (
        <AddPrivacyPolicy
          open={true}
          handleClose={handleCloseDialog}
          title="Add Privacy Policy"
          btnText="Add"
          editedRow={editedRow}
        />
      )}
      {openDialog === 'AddFAQs' && (
        <AddFAQs
          open={true}
          handleClose={handleCloseDialog}
          title="Add FAQ's"
          btnText="Create"
          editedRow={editedRow}
        />
      )}
      {/* Add similar conditional rendering for other dialogs */}
    </>
  );
}

export default Campaign;
