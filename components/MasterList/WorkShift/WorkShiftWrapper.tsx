import { ReactNode } from 'react';

function ModulesWrapper({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="table-responsive d-none d-lg-block">
        <table className="table ">
          <thead style={{ background: '#305B61', color: '#fefefe' }}>
            <tr>
              <th className="fw-semibold">Shift Name</th>
              <th className="fw-semibold">Start Time</th>
              <th className="fw-semibold">End Time</th>
              <th className="fw-semibold">Working Hours</th>
              <th className="fw-semibold">Status</th>
              <th className="text-center fw-semibold">Action</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ModulesWrapper;
