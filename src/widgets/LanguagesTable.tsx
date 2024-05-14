import { LanguageTableProps, LanguagesType } from '@/types/types';

const LanguageTable = (props: LanguageTableProps) => {
  const { data } = props;

  const languagesArr: LanguagesType[] = [];
  const languages: string[] = [];

  data.forEach((item) => {
    if (!languages.includes(item.language.name)) {
      languages.push(item.language.name);
      languagesArr.push({
        language: item.language.name,
        types: { audio: false, subtitles: false, interface: false },
      });
    }

    const index = languagesArr.findIndex(
      (lang) => lang.language === item.language.name
    );
    switch (item.language_support_type.name) {
      case 'Audio':
        languagesArr[index].types.audio = true;
        break;
      case 'Subtitles':
        languagesArr[index].types.subtitles = true;
        break;
      case 'Interface':
        languagesArr[index].types.interface = true;
        break;
      default:
        break;
    }
  });

  return (
    <table className="m-auto text-xs">
      <thead>
        <tr>
          <th className="p-1"></th>
          <th className="p-1">Audio</th>
          <th className="p-1">Subtitles</th>
          <th className="p-1">Interface</th>
        </tr>
      </thead>
      <tbody>
        {languagesArr.map((el, index) => (
          <tr key={index}>
            <td>{`${el.language}:`}</td>
            <td className="p-1 text-center">{el.types.audio ? '✓' : ''}</td>
            <td className="p-1 text-center">{el.types.subtitles ? '✓' : ''}</td>
            <td className="p-1 text-center">{el.types.interface ? '✓' : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LanguageTable;
