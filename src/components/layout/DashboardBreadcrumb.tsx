import { useNavigate } from 'react-router-dom';
import { useGlobalFilters } from '@/hooks/useGlobalFilters';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DashboardBreadcrumbProps {
  pageName?: string;
}

export function DashboardBreadcrumb({ pageName = 'Dashboard' }: DashboardBreadcrumbProps) {
  const { empresa, eolStatus } = useGlobalFilters();
  const navigate = useNavigate();

  const hasEmpresa = empresa !== 'Todas as Empresas';
  const hasEol = eolStatus !== 'todos';

  if (!hasEmpresa && !hasEol) return null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="cursor-pointer text-primary" onClick={() => navigate('/')}>
            {pageName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {hasEmpresa && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {hasEol ? (
                <BreadcrumbLink className="text-foreground">{empresa}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{empresa}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}
        {hasEol && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {eolStatus === 'eol' ? 'Apenas EoL' : 'Apenas Non-EoL'}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
