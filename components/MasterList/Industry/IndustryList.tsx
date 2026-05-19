'use client';

import Badge from '@/components/Badge/Badge';
import { IIndustry } from '@/lib/interface/IIndustry.interface';
import { formatDateList, getStatusColor } from '@/lib/utils';
import { Accordion, Stack } from 'react-bootstrap';
import IndustryActionDropDown from './IndustryActionDropDown';

function IndustryItem({ industry }: { industry: IIndustry }) {
  return (
    <Stack>
      <div className="my-2">
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-between ms-3">
            <h5 className="m-0 text-capitalize flex-grow-1 fw-normal text-dark">
              {industry?.name}
            </h5>
            <div className="ms-4">
              <Badge
                bg={getStatusColor(industry.is_deleted ? 'DELETED' : 'ACTIVE', true)}
                className={getStatusColor(industry.is_deleted ? 'DELETED' : 'ACTIVE', false)}
              >
                {industry.is_deleted ? 'Deleted' : 'Active'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
}

export default function IndustryList({ industries }: { industries: IIndustry[] }) {
  return (
    <Accordion className="d-sm-block d-lg-none">
      {industries?.map((industry) => (
        <Accordion.Item eventKey={industry.id} key={industry.id} className="mb-3 border-0">
          <Accordion.Button className="rounded-0" style={{ background: '#fefefe' }}>
            <IndustryItem industry={industry} />
          </Accordion.Button>
          <Accordion.Body>
            <div className="row">
              <div className="col-10">
                <div className="d-flex flex-wrap">
                  <div className="me-5">
                    <span style={{ color: '#8F8F8F' }} className="fw-normal">Sector</span>
                    <h6 className="text-capitalize">{industry.sector || '-'}</h6>
                  </div>
                  <div className="me-5">
                    <span style={{ color: '#8F8F8F' }} className="fw-normal">Description</span>
                    <h6>{industry.description || '-'}</h6>
                  </div>
                  <div>
                    <span style={{ color: '#8F8F8F' }} className="fw-normal">Updated On</span>
                    <h6>{formatDateList(industry.updatedAt)}</h6>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <IndustryActionDropDown theme={industry} />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
