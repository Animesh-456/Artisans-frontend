import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CountryReponse } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";

const Inbox2 = () => {
  return (
    <>
      <div
        className="banner_wp sign_banner"
        style={{ backgroundImage: "url(/img/banner1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="banner_text inner_banner_text">
              <h1 className="yh">My Profile</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container cjw">
        <div className="row">
          <AccountSideBar />

          <div className="col-sm-8">
            <div className="profile_box mb-4">
              <h3 className="pb-0">Project Name</h3>
              <hr className="dashed-hr" />
              <div className="project_profil">
                <div className="project_loop border-0 pb-0">
                  <form action="">
                    <div className="mb-3">
                      <label className="form-label">Messages</label>
                      <textarea rows={5}></textarea>
                    </div>
                    <div className="reg-bottom mb-0">
                      <button type="submit" name="submit">
                        Send
                      </button>
                    </div>
                    <hr className="dashed-hr" />
                    <div className="mb-3">
                      <label className="fileinput">
                        <span className="textsinput">Attached files</span>
                        <input
                          name="file"
                          type="file"
                          className="opacity-0 "
                          value=""
                        />
                      </label>
                    </div>
                  </form>
                  <div className="profile_box shadow-none p-0">
                    <div className="table-responsive inbox-table mt-4">
                      <table
                        className="table mb-0"
                        style={{ border: "1px solid #dee2e6" }}
                      >
                        <thead>
                          <tr>
                            <th>Sender</th>
                            <th>Message</th>
                            <th className="text-end">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="darkblue-text">Moi</td>
                            <td>testing2</td>
                            <td className="text-end">7-Oct,2022</td>
                          </tr>
                          <tr>
                            <td className="darkblue-text">Moi</td>
                            <td>testing2</td>
                            <td className="text-end">7-Oct,2022</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox2;
